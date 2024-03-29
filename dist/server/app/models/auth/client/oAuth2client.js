"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * OAuth2クライアント
 */
const crypto = require("crypto");
const createDebug = require("debug");
const http_status_1 = require("http-status");
const fetch = require("isomorphic-fetch");
const querystring = require("querystring");
const transporters_1 = require("../abstract/transporters");
const loginTicket_1 = require("../loginTicket");
const debug = createDebug('auth:oAuth2client');
/**
 * OAuth2 client
 */
class OAuth2client {
    constructor(options) {
        // tslint:disable-next-line:no-suspicious-comment
        // TODO add minimum validation
        /**
         * The base URL for auth endpoints.
         */
        this.OAUTH2_AUTH_BASE_URI = '/oauth2/authorize';
        /**
         * The base endpoint for token retrieval.
         */
        this.OAUTH2_TOKEN_URI = '/oauth2/token';
        /**
         * The base endpoint to revoke tokens.
         */
        this.OAUTH2_LOGOUT_URI = '/logout';
        this.options = options;
        this.credentials = {};
    }
    static BASE64URLENCODE(str) {
        return str
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }
    static SHA256(buffer) {
        return crypto.createHash('sha256').update(buffer).digest();
    }
    /**
     * Generates URL for consent page landing.
     */
    generateAuthUrl(optOpts) {
        const options = {
            response_type: 'code',
            client_id: this.options.clientId,
            redirect_uri: this.options.redirectUri,
            scope: optOpts.scopes.join(' '),
            state: optOpts.state,
        };
        if (optOpts.codeVerifier !== undefined) {
            options.code_challenge_method = 'S256';
            options.code_challenge = OAuth2client.BASE64URLENCODE(OAuth2client.SHA256(optOpts.codeVerifier));
        }
        const rootUrl = `https://${this.options.domain}${this.OAUTH2_AUTH_BASE_URI}`;
        return `${rootUrl}?${querystring.stringify(options)}`;
    }
    /**
     * Generates URL for logout.
     */
    generateLogoutUrl() {
        const options = {
            client_id: this.options.clientId,
            logout_uri: this.options.logoutUri,
        };
        const rootUrl = `https://${this.options.domain}${this.OAUTH2_LOGOUT_URI}`;
        return `${rootUrl}?${querystring.stringify(options)}`;
    }
    /**
     * Gets the access token for the given code.
     * @param code The authorization code.
     */
    getToken(code, codeVerifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = {
                code: code,
                client_id: this.options.clientId,
                redirect_uri: this.options.redirectUri,
                grant_type: 'authorization_code',
                code_verifier: codeVerifier,
            };
            const secret = Buffer.from(`${this.options.clientId}:${this.options.clientSecret}`, 'utf8').toString('base64');
            const options = {
                body: querystring.stringify(form),
                method: 'POST',
                headers: {
                    Authorization: `Basic ${secret}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };
            debug('fetching...', options);
            return fetch(`https://${this.options.domain}${this.OAUTH2_TOKEN_URI}`, options).then((response) => __awaiter(this, void 0, void 0, function* () {
                debug('response:', response.status);
                if (response.status !== http_status_1.OK) {
                    if (response.status === http_status_1.BAD_REQUEST) {
                        const body = yield response.json();
                        throw new Error(body.error);
                    }
                    else {
                        const body = yield response.text();
                        throw new Error(body);
                    }
                }
                else {
                    const tokens = yield response.json();
                    // tslint:disable-next-line:no-single-line-block-comment
                    /* istanbul ignore else */
                    if (tokens && tokens.expires_in) {
                        // tslint:disable-next-line:no-magic-numbers
                        tokens.expiry_date =
                            new Date().getTime() + tokens.expires_in * 1000;
                        delete tokens.expires_in;
                    }
                    return tokens;
                }
            }));
        });
    }
    /**
     * OAuthクライアントに認証情報をセットします。
     */
    setCredentials(credentials) {
        this.credentials = credentials;
    }
    refreshAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.credentials.refresh_token === undefined) {
                throw new Error('No refresh token is set.');
            }
            return this.refreshToken(this.credentials.refresh_token).then((tokens) => {
                tokens.refresh_token = this.credentials.refresh_token;
                debug('setting credentials...', tokens);
                this.credentials = tokens;
                return this.credentials;
            });
        });
    }
    /**
     * 期限の切れていないアクセストークンを取得します。
     * 必要であれば更新してから取得します。
     */
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:max-line-length
            const expiryDate = this.credentials.expiry_date;
            // if no expiry time, assume it's not expired
            const isTokenExpired = expiryDate !== undefined
                ? expiryDate <= new Date().getTime()
                : false;
            if (this.credentials.access_token === undefined &&
                this.credentials.refresh_token === undefined) {
                throw new Error('No access or refresh token is set.');
            }
            const shouldRefresh = this.credentials.access_token === undefined || isTokenExpired;
            // refreshTokenが存在すればrefreshAccessToken
            // tslint:disable-next-line:no-single-line-block-comment
            /* istanbul ignore else */
            if (shouldRefresh &&
                typeof this.credentials.refresh_token === 'string' &&
                this.credentials.refresh_token.length > 0) {
                yield this.refreshAccessToken();
            }
            return this.credentials.access_token;
        });
    }
    // public async signInWithLINE(idToken: string): Promise<ICredentials> {
    //     // request for new token
    //     debug('requesting access token...');
    //     return await request.post({
    //         url: `${API_ENDPOINT}/oauth/token/signInWithGoogle`,
    //         body: {
    //             idToken: idToken,
    //             client_id: this.clientId,
    //             client_secret: this.clientSecret,
    //             scopes: this.scopes,
    //             state: this.state
    //         },
    //         json: true,
    //         simple: false,
    //         resolveWithFullResponse: true,
    //         useQuerystring: true
    //     }).then((response) => {
    //         if (response.statusCode !== httpStatus.OK) {
    //             if (typeof response.body === 'string') {
    //                 throw new Error(response.body);
    //             }
    //             if (typeof response.body === 'object' && response.body.errors !== undefined) {
    //                 const message = (<any[]>response.body.errors).map((error) => {
    //                     return `[${error.title}]${error.detail}`;
    //                 }).join(', ');
    //                 throw new Error(message);
    //             }
    //             throw new Error('An unexpected error occurred');
    //         }
    //         const tokens = response.body;
    //         if (tokens && tokens.expires_in) {
    //             // tslint:disable-next-line:no-magic-numbers
    //             tokens.expiry_date = ((new Date()).getTime() + (tokens.expires_in * 1000));
    //             delete tokens.expires_in;
    //         }
    //         this.credentials = tokens;
    //         return tokens;
    //     });
    // }
    /**
     * Revokes the access given to token.
     * @param token The existing token to be revoked.
     */
    // public revokeToken(token: string) {
    // }
    /**
     * Provides a request implementation with OAuth 2.0 flow.
     * If credentials have a refresh_token, in cases of HTTP
     * 401 and 403 responses, it automatically asks for a new
     * access token and replays the unsuccessful request.
     * @param options Request options.
     */
    fetch(url, options, expectedStatusCodes) {
        return __awaiter(this, void 0, void 0, function* () {
            // Callbacks will close over this to ensure that we only retry once
            let retry = true;
            options.headers =
                options.headers === undefined || options.headers === null
                    ? {}
                    : options.headers;
            let result;
            let numberOfTry = 0;
            // tslint:disable-next-line:no-magic-numbers
            while (numberOfTry >= 0) {
                try {
                    numberOfTry += 1;
                    if (numberOfTry > 1) {
                        retry = false;
                    }
                    (options.headers).Authorization = `Bearer ${yield this.getAccessToken()}`;
                    result = yield this.makeFetch(url, options, expectedStatusCodes);
                    break;
                }
                catch (error) {
                    // tslint:disable-next-line:no-single-line-block-comment
                    /* istanbul ignore else */
                    if (error instanceof Error) {
                        const statusCode = error.code;
                        if (retry &&
                            (statusCode === http_status_1.UNAUTHORIZED ||
                                statusCode === http_status_1.FORBIDDEN)) {
                            /* It only makes sense to retry once, because the retry is intended
                             * to handle expiration-related failures. If refreshing the token
                             * does not fix the failure, then refreshing again probably won't
                             * help */
                            // Force token refresh
                            // refreshTokenが存在すれば強制的にrefreshAccessToken
                            // tslint:disable-next-line:no-single-line-block-comment
                            /* istanbul ignore else */
                            if (typeof this.credentials.refresh_token ===
                                'string' &&
                                this.credentials.refresh_token.length > 0) {
                                yield this.refreshAccessToken();
                            }
                            continue;
                        }
                    }
                    throw error;
                }
            }
            return result;
        });
    }
    /**
     * IDトークンを検証する
     * 結果にはIDトークンの付加情報が含まれます。
     */
    verifyIdToken(options) {
        if (this.credentials.id_token === undefined) {
            throw new Error('The verifyIdToken method requires an ID Token');
        }
        // return this.verifySignedJwt(options.idToken, options.audience, OAuth2Client.ISSUERS_);
        return this.verifySignedJwt(this.credentials.id_token, options.audience);
    }
    /**
     * Provides a request implementation with OAuth 2.0 flow.
     * If credentials have a refresh_token, in cases of HTTP
     * 401 and 403 responses, it automatically asks for a new
     * access token and replays the unsuccessful request.
     * @param options Request options.
     */
    // public async request(options: request.OptionsWithUri, expectedStatusCodes: number[]) {
    //     const accessToken = await this.getAccessToken();
    //     options.auth = { bearer: accessToken };
    //     return this.makeRequest(options, expectedStatusCodes);
    // }
    /**
     * Makes a request without paying attention to refreshing or anything
     * Assumes that all credentials are set correctly.
     * @param opts Options for request
     * @param callback callback function
     */
    // tslint:disable-next-line:prefer-function-over-method
    // public async makeRequest(options: request.OptionsWithUri, expectedStatusCodes: number[]) {
    //     const transporter = new DefaultTransporter(expectedStatusCodes);
    //     return transporter.request(options);
    // }
    /**
     * Makes a request without paying attention to refreshing or anything
     * Assumes that all credentials are set correctly.
     */
    // tslint:disable-next-line:prefer-function-over-method
    makeFetch(url, options, expectedStatusCodes) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = new transporters_1.DefaultTransporter(expectedStatusCodes);
            return transporter.fetch(url, options);
        });
    }
    /**
     * Refreshes the access token.
     */
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // request for new token
            debug('refreshing access token...', this.credentials, refreshToken);
            const form = {
                client_id: this.options.clientId,
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            };
            const secret = Buffer.from(`${this.options.clientId}:${this.options.clientSecret}`, 'utf8').toString('base64');
            const options = {
                body: querystring.stringify(form),
                method: 'POST',
                headers: {
                    Authorization: `Basic ${secret}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };
            debug('fetching...', options);
            return fetch(`https://${this.options.domain}${this.OAUTH2_TOKEN_URI}`, options).then((response) => __awaiter(this, void 0, void 0, function* () {
                debug('response:', response.status);
                if (response.status !== http_status_1.OK) {
                    if (response.status === http_status_1.BAD_REQUEST) {
                        const body = yield response.json();
                        throw new Error(body.error);
                    }
                    else {
                        const body = yield response.text();
                        throw new Error(body);
                    }
                }
                else {
                    const tokens = yield response.json();
                    // tslint:disable-next-line:no-single-line-block-comment
                    /* istanbul ignore else */
                    if (tokens && tokens.expires_in) {
                        // tslint:disable-next-line:no-magic-numbers
                        tokens.expiry_date =
                            new Date().getTime() + tokens.expires_in * 1000;
                        delete tokens.expires_in;
                    }
                    return tokens;
                }
            }));
        });
    }
    /**
     * Verify the id token is signed with the correct certificate
     * and is from the correct audience.
     * @param jwt The jwt to verify (The ID Token in this case).
     * @param requiredAudience The audience to test the jwt against.
     * @param issuers The allowed issuers of the jwt (Optional).
     */
    // tslint:disable-next-line:prefer-function-over-method
    verifySignedJwt(jwt, requiredAudience) {
        // private verifySignedJwt(jwt: string, requiredAudience: string | string[], issuers?: string[]) {
        const segments = jwt.split('.');
        // tslint:disable-next-line:no-magic-numbers
        if (segments.length !== 3) {
            throw new Error(`Wrong number of segments in token: ${jwt}`);
        }
        // const signed = `${segments[0]}.${segments[1]}`;
        // // tslint:disable-next-line:no-magic-numbers
        // const signature = segments[2];
        let envelope;
        let payload;
        try {
            envelope = JSON.parse(new Buffer(segments[0], 'base64').toString('utf8'));
        }
        catch (err) {
            throw new Error(`Can't parse token envelope: ${segments[0]}`);
        }
        try {
            payload = JSON.parse(new Buffer(segments[1], 'base64').toString('utf8'));
        }
        catch (err) {
            throw new Error(`Can't parse token payload: ${segments[0]}`);
        }
        if (payload.iat === undefined) {
            throw new Error(`No issue time in token: ${JSON.stringify(payload)}`);
        }
        if (payload.exp === undefined) {
            throw new Error(`No expiration time in token: ${JSON.stringify(payload)}`);
        }
        if (isNaN(payload.iat)) {
            throw new Error('iat field using invalid format');
        }
        if (isNaN(payload.exp)) {
            throw new Error('exp field using invalid format');
        }
        // if (issuers !== undefined && issuers.indexOf(payload.iss) < 0) {
        //     throw new Error(`Invalid issuer, expected one of [${issuers}], but got ${payload.iss}`);
        // }
        // Check the audience matches if we have one
        // tslint:disable-next-line:no-single-line-block-comment
        /* istanbul ignore else */
        if (requiredAudience !== undefined) {
            const aud = payload.aud;
            let audVerified = false;
            // If the requiredAudience is an array, check if it contains token
            if (Array.isArray(requiredAudience)) {
                audVerified = requiredAudience.indexOf(aud) > -1;
            }
            else {
                audVerified = aud === requiredAudience;
            }
            if (!audVerified) {
                throw new Error('Wrong recipient, payload audience != requiredAudience');
            }
        }
        return new loginTicket_1.LoginTicket({
            envelope: envelope,
            payload: payload,
        });
    }
}
exports.default = OAuth2client;
