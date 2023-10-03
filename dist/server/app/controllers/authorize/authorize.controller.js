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
 * authorize
 */
const debug = require("debug");
const cognitoOAuth2_1 = require("../../models/auth/session/cognitoOAuth2");
const oAuth2_1 = require("../../models/auth/session/oAuth2");
const log = debug('sskts-ticket:authorize');
/**
 * サインインリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function signInRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('signInRedirect');
        try {
            if (req.session === undefined) {
                throw new Error('session is undefined');
            }
            const authModel = oAuth2_1.OAuth2.STATE === req.query.state
                ? new oAuth2_1.OAuth2(req.session.auth)
                : cognitoOAuth2_1.CognitoOAuth2.STATE === req.query.state
                    ? new cognitoOAuth2_1.CognitoOAuth2(req.session.cognito)
                    : undefined;
            if (authModel === undefined) {
                throw new Error(`state not matched [${req.query.state}]`);
            }
            const auth = authModel.create(req);
            const credentials = yield auth.getToken(req.query.code, authModel.codeVerifier);
            log('credentials published');
            authModel.credentials = credentials;
            authModel.save(req.session);
            auth.setCredentials(credentials);
            res.redirect('/#/auth/signin');
        }
        catch (err) {
            delete req.session.auth;
            delete req.session.cognito;
            res.redirect('/#/error');
        }
    });
}
exports.signInRedirect = signInRedirect;
/**
 * サインアウトリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 */
function signOutRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('signOutRedirect');
        if (req.session.auth !== undefined) {
            delete req.session.auth;
        }
        else {
            delete req.session.cognito;
        }
        res.redirect('/#/auth/signout');
    });
}
exports.signOutRedirect = signOutRedirect;
