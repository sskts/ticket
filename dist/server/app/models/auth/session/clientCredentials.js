"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const clientCredentialsClient_1 = require("../client/clientCredentialsClient");
/**
 * 認証モデル
 * @class ClientCredentials
 */
class ClientCredentials {
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
     * @method create
     */
    create() {
        return new clientCredentialsClient_1.default({
            domain: process.env.CLIENT_CREDENTIALS_DOMAIN,
            clientId: process.env.CLIENT_CREDENTIALS_CLIENT_ID,
            clientSecret: process.env.CLIENT_CREDENTIALS_CLIENT_SECRET,
            state: this.state,
            scopes: this.scopes,
        });
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
        session.auth = authSession;
    }
}
exports.ClientCredentials = ClientCredentials;
