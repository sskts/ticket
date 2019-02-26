"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sasaki = require("@motionpicture/sskts-api-nodejs-client");
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
        this.state = (session.state !== undefined) ? session.state : uuid.v1();
        const resourceServerUrl = process.env.RESOURCE_SERVER_URL;
        this.scopes = (session.scopes !== undefined) ? session.scopes : [
            `${resourceServerUrl}/sellers.read-only`,
            `${resourceServerUrl}/places`,
            `${resourceServerUrl}/organizations.read-only`,
            `${resourceServerUrl}/events.read-only`,
            `${resourceServerUrl}/orders.read-only`,
            `${resourceServerUrl}/organizations`,
            `${resourceServerUrl}/places.read-only`,
            `${resourceServerUrl}/orders`,
            `${resourceServerUrl}/transactions`,
            `${resourceServerUrl}/events`
        ];
        this.credentials = session.credentials;
        this.codeVerifier = session.codeVerifier;
    }
    /**
     * 認証クラス作成
     * @memberof AuthModel
     * @method create
     * @returns {sasaki.auth.ClientCredentials}
     */
    create() {
        return new sasaki.auth.ClientCredentials({
            domain: process.env.AUTHORIZE_SERVER_DOMAIN,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            state: this.state,
            scopes: this.scopes
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
            codeVerifier: this.codeVerifier
        };
        session.auth = authSession;
    }
}
exports.AuthModel = AuthModel;
