import * as cinerino from '@cinerino/sdk';
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
 * @class CognitoAuth2Model
 */
export class CognitoAuth2Model {
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
        this.state = CognitoAuth2Model.STATE;
        this.codeVerifier = CognitoAuth2Model.CODE_VERIFIER;
    }

    /**
     * 認証クラス作成
     * @memberof Auth2Model
     * @method create
     * @returns {cinerino.auth.OAuth2}
     */
    public create(): cinerino.auth.OAuth2 {
        const auth = new cinerino.auth.OAuth2({
            domain: <string>process.env.COGNITO_AUTHORIZATION_CODE_DOMAIN,
            clientId: <string>process.env.COGNITO_AUTHORIZATION_CODE_CLIENT_ID,
            clientSecret: <string>(
                process.env.COGNITO_AUTHORIZATION_CODE_CLIENT_SECRET
            ),
            redirectUri: <string>process.env.AUTH_REDIRECT_URI,
            logoutUri: <string>process.env.AUTH_LOGUOT_URI,
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
     * @memberof Auth2Model
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
