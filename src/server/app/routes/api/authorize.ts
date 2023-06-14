/**
 * 認証API
 */
import * as debug from 'debug';
import * as express from 'express';
import { errorProsess } from '../../controllers/base/base.controller';
import { ClientCredentials } from '../../models/auth/session/clientCredentials';
import { CognitoOAuth2 } from '../../models/auth/session/cognitoOAuth2';
import { OAuth2 } from '../../models/auth/session/oAuth2';
import * as moment from 'moment';

const router = express.Router();
const log = debug('sskts-ticket:api/authorize');
const UPDATE_ACCESS_TOKEN_TIME_MINUTES = 15;
let credentials:
    | { accessToken: string; expiryDate?: number; clientId?: string }
    | undefined;

export enum MemberType {
    NotMember = '0',
    Member = '1',
}

/**
 * 認証情報取得
 */
router.post('/getCredentials', async (req, res) => {
    log('getCredentials');
    try {
        if (req.session === undefined) {
            throw new Error('session is undefined');
        }
        const body = req.body;
        const endpoint = <string>process.env.SSKTS_API_ENDPOINT;
        const apiEndpoint = <string>process.env.API_ENDPOINT;
        const projectId = <string>process.env.PROJECT_ID;
        const waiterServerUrl = <string>process.env.WAITER_SERVER_URL;
        let userName;
        let accessToken: string;
        let expiryDate: number | undefined;
        let clientId: string | undefined;
        let authModel;
        if (body.member === MemberType.Member) {
            authModel = new OAuth2(req.session.auth);
            const options = { endpoint, auth: authModel.create(req) };
            accessToken = await options.auth.getAccessToken();
            authModel.credentials = options.auth.credentials;
            authModel.save(req.session);
            clientId = options.auth.options.clientId;
            userName =
                body.member === MemberType.Member
                    ? options.auth.verifyIdToken({}).getUsername()
                    : undefined;
        } else {
            const now = moment().toISOString();
            const isTokenExpired =
                credentials !== undefined &&
                credentials.expiryDate !== undefined
                    ? moment(credentials.expiryDate)
                          .add(-1 * UPDATE_ACCESS_TOKEN_TIME_MINUTES, 'minutes')
                          .unix() <= moment(now).unix()
                    : false;
            if (credentials === undefined || isTokenExpired) {
                // 更新
                authModel = new ClientCredentials();
                const options = {
                    endpoint,
                    auth: authModel.create(),
                };
                accessToken = await options.auth.getAccessToken();
                expiryDate = options.auth.credentials.expiry_date;
                clientId = options.auth.options.clientId;
                credentials = {
                    accessToken,
                    expiryDate,
                    clientId,
                };
            } else {
                accessToken = credentials.accessToken;
                expiryDate = credentials.expiryDate;
                clientId = credentials.clientId;
            }
        }
        log('getCredentials MemberType', body.member);

        res.json({
            credentials: { accessToken },
            userName,
            clientId,
            endpoint,
            projectId,
            waiterServerUrl,
            apiEndpoint,
        });
    } catch (err) {
        errorProsess(res, err);
    }
});

/**
 * サインイン処理
 * @param {Request} req
 * @param {Response} res
 */
router.get('/signIn', async (req, res) => {
    log('signIn');
    if (req.session === undefined) {
        throw new Error('session is undefined');
    }
    delete req.session.auth;
    const authModel = new OAuth2(req.session.auth);
    const auth = authModel.create(req);
    const url = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier,
    });
    delete req.session.auth;
    res.json({ url });
});

/**
 * サインアウト処理
 * @param {Request} req
 * @param {Response} res
 */
router.get('/signOut', async (req, res) => {
    log('signOut');
    if (req.session === undefined || req.session.auth === undefined) {
        res.status(400).json({
            error: {
                message: 'session undefined',
            },
        });
        return;
    }
    const authModel = new OAuth2(req.session.auth);
    const auth = authModel.create(req);
    const url = auth.generateLogoutUrl();
    res.json({ url });
});

/**
 * サインアップ処理
 * @param {Request} req
 * @param {Response} res
 */
router.get('/signUp', async (req, res) => {
    log('signUp');
    if (req.session === undefined) {
        throw new Error('session is undefined');
    }
    delete req.session.cognito;
    const authModel = new CognitoOAuth2(req.session.cognito);
    const auth = authModel.create(req);
    let url = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier,
    });
    url = url
        .replace(
            <string>process.env.AUTHORIZATION_CODE_DOMAIN,
            <string>process.env.COGNITO_AUTHORIZATION_CODE_DOMAIN
        )
        .replace(/\/authorize/, '/signup');
    delete req.session.cognito;
    res.json({ url });
});

export const authorizeRouter = router;
