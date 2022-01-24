"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cinerino = require("@cinerino/sdk");
/**
 * 認証モデル
 * @class CognitoAuth2Model
 */
class CognitoAuth2Model {
    /**
     * @constructor
     * @param {any} session
     */
    constructor(session) {
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
    create() {
        const auth = new cinerino.auth.OAuth2({
            domain: process.env.COGNITO_AUTHORIZATION_CODE_DOMAIN,
            clientId: process.env.COGNITO_AUTHORIZATION_CODE_CLIENT_ID,
            clientSecret: (process.env.COGNITO_AUTHORIZATION_CODE_CLIENT_SECRET),
            redirectUri: process.env.AUTH_REDIRECT_URI,
            logoutUri: process.env.AUTH_LOGUOT_URI,
            state: this.state,
            scopes: this.scopes.join(' '),
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
    save(session) {
        const authSession = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier,
        };
        session.cognito = authSession;
    }
}
exports.CognitoAuth2Model = CognitoAuth2Model;
/**
 * 状態（固定値）
 */
CognitoAuth2Model.STATE = 'COGNITO_STATE';
/**
 * 検証コード（固定値）
 */
CognitoAuth2Model.CODE_VERIFIER = 'CODE_VERIFIER';
