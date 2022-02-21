/**
 * authorize
 */
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { CognitoOAuth2 } from '../../models/auth/session/cognitoOAuth2';
import { OAuth2 } from '../../models/auth/session/oAuth2';
const log = debug('sskts-ticket:authorize');

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
        const authModel =
            OAuth2.STATE === req.query.state
                ? new OAuth2(req.session.auth)
                : CognitoOAuth2.STATE === req.query.state
                ? new CognitoOAuth2(req.session.cognito)
                : undefined;
        if (authModel === undefined) {
            throw new Error(`state not matched [${req.query.state}]`);
        }
        const auth = authModel.create();
        const credentials = await auth.getToken(
            req.query.code,
            <string>authModel.codeVerifier
        );
        log('credentials published');

        authModel.credentials = credentials;
        authModel.save(req.session);

        auth.setCredentials(credentials);
        res.redirect('/#/auth/signin');
    } catch (err) {
        next(err);
    }
}

/**
 * サインアウトリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 */
export async function signOutRedirect(req: Request, res: Response) {
    log('signOutRedirect');
    if ((<Express.Session>req.session).auth !== undefined) {
        delete (<Express.Session>req.session).auth;
    } else {
        delete (<Express.Session>req.session).cognito;
    }

    res.redirect('/#/auth/signout');
}
