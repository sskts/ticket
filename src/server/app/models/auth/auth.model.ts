import * as cinerino from '@cinerino/sdk';
import * as uuid from 'uuid';

/**
 * 認証セッション
 * @interface IAuthSession
 */
export interface IAuthSession {
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
 * @class AuthModel
 */
export class AuthModel {
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
        this.state = session.state !== undefined ? session.state : uuid.v1();
        this.scopes = [];
        this.credentials = session.credentials;
        this.codeVerifier = session.codeVerifier;
    }

    /**
     * 認証クラス作成
     * @memberof AuthModel
     * @method create
     * @returns {cinerino.auth.ClientCredentials}
     */
    public create(): cinerino.auth.ClientCredentials {
        return new cinerino.auth.ClientCredentials({
            domain: <string>process.env.CLIENT_CREDENTIALS_DOMAIN,
            clientId: <string>process.env.CLIENT_CREDENTIALS_CLIENT_ID,
            clientSecret: <string>process.env.CLIENT_CREDENTIALS_CLIENT_SECRET,
            state: this.state,
            scopes: this.scopes,
        });
    }

    /**
     * セッションへ保存
     * @memberof AuthModel
     * @method save
     * @returns {Object}
     */
    public save(session: any): void {
        const authSession: IAuthSession = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier,
        };
        session.auth = authSession;
    }
}
