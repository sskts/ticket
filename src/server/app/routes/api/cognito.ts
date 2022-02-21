/**
 * 認証API
 */
import * as debug from 'debug';
import * as express from 'express';
import { errorProsess } from '../../controllers/base/base.controller';
import { CognitoOAuth2 } from '../../models/auth/session/cognitoOAuth2';

const router = express.Router();
const log = debug('sskts-ticket:api/cognito');

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
        let userName;
        let credentials;
        const authModel = new CognitoOAuth2(req.session.cognito);
        const options = { auth: authModel.create() };
        const accessToken = await options.auth.getAccessToken();
        authModel.credentials = options.auth.credentials;
        authModel.save(req.session);
        credentials = { accessToken };
        userName = options.auth.verifyIdToken({}).getUsername();

        res.json({
            credentials,
            userName,
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
    delete req.session.cognito;
    const authModel = new CognitoOAuth2(req.session.cognito);
    const auth = authModel.create();
    const url = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier,
    });
    delete req.session.cognito;
    res.json({ url });
});

/**
 * サインアウト処理
 * @param {Request} req
 * @param {Response} res
 */
router.get('/signOut', async (req, res) => {
    log('signOut');
    if (req.session === undefined || req.session.cognito === undefined) {
        res.status(400).json({
            error: {
                message: 'session undefined',
            },
        });
        return;
    }
    const authModel = new CognitoOAuth2(req.session.cognito);
    const auth = authModel.create();
    const url = auth.generateLogoutUrl();
    res.json({ url });
});

export const cognitoRouter = router;
