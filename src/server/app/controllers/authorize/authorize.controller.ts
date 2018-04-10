/**
 * authorize
 */
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { AuthModel } from '../../models/auth/auth.model';
import { Auth2Model } from '../../models/auth2/auth2.model';
import { errorProsess } from '../base/base.controller';
const log = debug('SSKTS:authorize');

/**
 * 資格情報取得
 * @param {Request} req
 * @param {Response} res
 */
export async function getCredentials(req: Request, res: Response) {
    log('getCredentials');
    try {
        let authModel;
        if (req.query.member === MemberType.NotMember) {
            authModel = new AuthModel((<Express.Session>req.session).auth);
        } else if (req.query.member === MemberType.Member) {
            authModel = new Auth2Model((<Express.Session>req.session).auth);
        } else {
            throw new Error('member does not macth MemberType');
        }
        const options = {
            endpoint: (<string>process.env.SSKTS_API_ENDPOINT),
            auth: authModel.create()
        };
        const accessToken = await options.auth.getAccessToken();
        const credentials = {
            accessToken: accessToken
        };

        log('getCredentials MemberType', req.query.member);
        res.json(credentials);
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
    delete (<Express.Session>req.session).auth;
    const authModel = new Auth2Model((<Express.Session>req.session).auth);
    const auth = authModel.create();
    authModel.codeVerifier = createCodeVerifier(4);
    authModel.save(req.session);

    const authUrl = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier
    });
    // console.log('authUrl:', authUrl);
    res.json({
        url: authUrl
    });
}

/**
 * サインインリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function signInRedirect(req: Request, res: Response, next: NextFunction) {
    log('signInRedirect');
    try {
        const authModel = new Auth2Model((<Express.Session>req.session).auth);
        if (req.query.state !== authModel.state) {
            throw (new Error('state not matched'));
        }
        const auth = authModel.create();
        const credentials = await auth.getToken(
            req.query.code,
            <string>authModel.codeVerifier
        );
        // log('credentials published', credentials);

        authModel.credentials = credentials;
        authModel.save(req.session);

        auth.setCredentials(credentials);
        res.redirect('/');
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
        url: logoutUrl
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
    res.redirect('/');
}

/**
 * 検証コード生成
 * @param {number} length
 */
function createCodeVerifier(length: number) {
    const CODE_TABLE = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(CODE_TABLE.length * Math.random());
        result += CODE_TABLE.charAt(index);
    }
    return result;
}

export enum MemberType {
    NotMember = '0',
    Member = '1'
}
