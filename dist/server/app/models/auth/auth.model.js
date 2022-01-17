"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cinerino = require("@cinerino/sdk");
const uuid = require("uuid");
/**
 * 認証モデル
 * @class AuthModel
 */
class AuthModel {
    /**
     * @constructor
     * @param {any} session
     */
    constructor(session) {
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
    create() {
        return new cinerino.auth.ClientCredentials({
            domain: process.env.CLIENT_CREDENTIALS_DOMAIN,
            clientId: process.env.CLIENT_CREDENTIALS_CLIENT_ID,
            clientSecret: process.env.CLIENT_CREDENTIALS_CLIENT_SECRET,
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
    save(session) {
        const authSession = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier,
        };
        session.auth = authSession;
    }
}
exports.AuthModel = AuthModel;
