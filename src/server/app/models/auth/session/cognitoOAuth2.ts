import { Request } from 'express';
import CognitoOAuth2client from '../client/cognitoOAuth2client';

/**
 * 認証セッション
 * @interface IAuth2Session
 */
export interface IAuth2Session {
    /**
     * 状態
     */
    state: string;
    /**
     * スコープ
     */
    scopes: string[];
    /**
     * 資格情報
     */
    credentials?: any;
    /**
     * コード検証
     */
    codeVerifier?: string;
}

/**
 * 認証モデル
 * @class CognitoOAuth2
 */
export class CognitoOAuth2 {
    /**
     * 状態（固定値）
     */
    public static STATE = 'COGNITO_STATE';
    /**
     * 検証コード（固定値）
     */
    private static CODE_VERIFIER = 'CODE_VERIFIER';
    /**
     * 状態
     */
    public state: string;
    /**
     * スコープ
     */
    public scopes: string[];
    /**
     * 資格情報
     */
    public credentials?: any;
    /**
     * コード検証
     */
    public codeVerifier?: string;

    /**
     * @constructor
     * @param {any} session
     */
    constructor(session?: any) {
        if (session === undefined) {
            session = {};
        }
        this.scopes = [];
        this.credentials = session.credentials;
        this.state = CognitoOAuth2.STATE;
        this.codeVerifier = CognitoOAuth2.CODE_VERIFIER;
    }

    /**
     * 認証クラス作成
     * @method create
     */
    public create(req: Request) {
        const auth = new CognitoOAuth2client({
            domain: <string>process.env.COGNITO_AUTHORIZATION_CODE_DOMAIN,
            clientId: <string>process.env.COGNITO_AUTHORIZATION_CODE_CLIENT_ID,
            clientSecret: <string>(
                process.env.COGNITO_AUTHORIZATION_CODE_CLIENT_SECRET
            ),
            redirectUri: process.env.PORT
                ? `${req.protocol}://${req.hostname}:${process.env.PORT}/signIn`
                : `${req.protocol}://${req.hostname}/signIn`,
            logoutUri: process.env.PORT
                ? `${req.protocol}://${req.hostname}:${process.env.PORT}/signOut`
                : `${req.protocol}://${req.hostname}/signOut`,
            state: this.state,
            scopes: <any>this.scopes.join(' '),
        });
        if (this.credentials !== undefined) {
            auth.setCredentials(this.credentials);
        }

        return auth;
    }

    /**
     * セッションへ保存
     * @method save
     * @returns {Object}
     */
    public save(session: Express.Session): void {
        const authSession: IAuth2Session = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier,
        };
        session.cognito = authSession;
    }
}
