"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cognitoOAuth2client_1 = require("../client/cognitoOAuth2client");
/**
 * 認証モデル
 * @class CognitoOAuth2
 */
class CognitoOAuth2 {
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
        this.state = CognitoOAuth2.STATE;
        this.codeVerifier = CognitoOAuth2.CODE_VERIFIER;
    }
    /**
     * 認証クラス作成
     * @method create
     */
    create(req) {
        const auth = new cognitoOAuth2client_1.default({
            domain: process.env.COGNITO_AUTHORIZATION_CODE_DOMAIN,
            clientId: process.env.COGNITO_AUTHORIZATION_CODE_CLIENT_ID,
            clientSecret: (process.env.COGNITO_AUTHORIZATION_CODE_CLIENT_SECRET),
            redirectUri: process.env.PORT
                ? `${req.protocol}://${req.hostname}:${process.env.PORT}/signIn`
                : `${req.protocol}://${req.hostname}/signIn`,
            logoutUri: process.env.PORT
                ? `${req.protocol}://${req.hostname}:${process.env.PORT}/signOut`
                : `${req.protocol}://${req.hostname}/signOut`,
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
exports.CognitoOAuth2 = CognitoOAuth2;
/**
 * 状態（固定値）
 */
CognitoOAuth2.STATE = 'COGNITO_STATE';
/**
 * 検証コード（固定値）
 */
CognitoOAuth2.CODE_VERIFIER = 'CODE_VERIFIER';
