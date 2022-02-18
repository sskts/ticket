"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * OAuth2クライアント
 */
const oAuth2client_1 = require("./oAuth2client");
/**
 * cognito OAuth2 client
 */
class CognitoOAuth2client extends oAuth2client_1.default {
    constructor() {
        super(...arguments);
        /**
         * The base URL for auth endpoints.
         */
        this.OAUTH2_AUTH_BASE_URI = '/authorize';
        /**
         * The base endpoint for token retrieval.
         */
        this.OAUTH2_TOKEN_URI = '/token';
        /**
         * The base endpoint to revoke tokens.
         */
        this.OAUTH2_LOGOUT_URI = '/logout';
    }
}
exports.default = CognitoOAuth2client;
