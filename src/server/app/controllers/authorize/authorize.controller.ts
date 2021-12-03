/**
 * authorize
 */
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { AuthModel } from '../../models/auth/auth.model';
import { Auth2Model } from '../../models/auth2/auth2.model';
import { errorProsess } from '../base/base.controller';
const log = debug('sskts-ticket:authorize');

export enum MemberType {
    NotMember = '0',
    Member = '1',
}

/**
 * 資格情報取得
 * @param {Request} req
 * @param {Response} res
 */
export async function getCredentials(req: Request, res: Response) {
    log('getCredentials', req.method);
    try {
        if (req.session === undefined) {
            throw new Error('session is undefined');
        }
        const body =
            req.method === 'POST' || req.method === 'post'
                ? req.body
                : req.query;
        const endpoint = <string>process.env.SSKTS_API_ENDPOINT;
        const projectId = <string>process.env.PROJECT_ID;
        const waiterServerUrl = <string>process.env.WAITER_SERVER_URL;
        let userName;
        let credentials;
        let clientId;
        let authModel;
        if (body.member === MemberType.Member) {
            authModel = new Auth2Model(req.session.auth);
            const options = { endpoint, auth: authModel.create() };
            const accessToken = await options.auth.getAccessToken();
            authModel.credentials = options.auth.credentials;
            authModel.save(req.session);
            credentials = { accessToken };
            clientId = options.auth.options.clientId;
            userName =
                body.member === MemberType.Member
                    ? options.auth.verifyIdToken(<any>{}).getUsername()
                    : undefined;
        } else {
            authModel = new AuthModel();
            const options = { endpoint, auth: authModel.create() };
            const accessToken = await options.auth.getAccessToken();
            credentials = { accessToken };
            clientId = options.auth.options.clientId;
        }
        log('getCredentials MemberType', body.member);

        res.json({
            credentials,
            userName,
            clientId,
            endpoint,
            projectId,
            waiterServerUrl,
        });
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * サインイン処理
 * @param {Request} req
 * @param {Response} res
 */
export async function signIn(req: Request, res: Response) {
    log('signIn');
    if (req.session === undefined) {
        throw new Error('session is undefined');
    }
    delete req.session.auth;
    const authModel = new Auth2Model(req.session.auth);
    const auth = authModel.create();
    const authUrl = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier,
    });
    delete req.session.auth;
    res.json({ url: authUrl });
}

/**
 * サインインリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function signInRedirect(
    req: Request,
    res: Response,
    next: NextFunction
) {
    log('signInRedirect');
    try {
        if (req.session === undefined) {
            throw new Error('session is undefined');
        }
        const authModel = new Auth2Model(req.session.auth);
        if (req.query.state !== authModel.state) {
            throw new Error(
                `state not matched ${req.query.state} !== ${authModel.state}`
            );
        }
        const auth = authModel.create();
        const credentials = await auth.getToken(
            req.query.code,
            <string>authModel.codeVerifier
        );
        log('credentials published', credentials);

        authModel.credentials = credentials;
        authModel.save(req.session);

        auth.setCredentials(credentials);
        res.redirect('/#/auth/signin');
    } catch (err) {
        next(err);
    }
}

/**
 * サインアウト処理
 * @param {Request} req
 * @param {Response} res
 */
export async function signOut(req: Request, res: Response) {
    log('signOut');
    const authModel = new Auth2Model((<Express.Session>req.session).auth);
    const auth = authModel.create();
    const logoutUrl = auth.generateLogoutUrl();
    log('logoutUrl:', logoutUrl);
    res.json({
        url: logoutUrl,
    });
}

/**
 * サインアウトリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 */
export async function signOutRedirect(req: Request, res: Response) {
    log('signOutRedirect');
    delete (<Express.Session>req.session).auth;
    res.redirect('/#/auth/signout');
}
