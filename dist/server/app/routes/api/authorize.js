"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 認証API
 */
const debug = require("debug");
const express = require("express");
const base_controller_1 = require("../../controllers/base/base.controller");
const clientCredentials_1 = require("../../models/auth/session/clientCredentials");
const cognitoOAuth2_1 = require("../../models/auth/session/cognitoOAuth2");
const oAuth2_1 = require("../../models/auth/session/oAuth2");
const router = express.Router();
const log = debug('sskts-ticket:api/authorize');
var MemberType;
(function (MemberType) {
    MemberType["NotMember"] = "0";
    MemberType["Member"] = "1";
})(MemberType = exports.MemberType || (exports.MemberType = {}));
/**
 * 認証情報取得
 */
router.post('/getCredentials', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log('getCredentials');
    try {
        if (req.session === undefined) {
            throw new Error('session is undefined');
        }
        const body = req.body;
        const endpoint = process.env.SSKTS_API_ENDPOINT;
        const apiEndpoint = process.env.API_ENDPOINT;
        const projectId = process.env.PROJECT_ID;
        const waiterServerUrl = process.env.WAITER_SERVER_URL;
        let userName;
        let credentials;
        let clientId;
        let authModel;
        if (body.member === MemberType.Member) {
            authModel = new oAuth2_1.OAuth2(req.session.auth);
            const options = { endpoint, auth: authModel.create(req) };
            const accessToken = yield options.auth.getAccessToken();
            authModel.credentials = options.auth.credentials;
            authModel.save(req.session);
            credentials = { accessToken };
            clientId = options.auth.options.clientId;
            userName =
                body.member === MemberType.Member
                    ? options.auth.verifyIdToken({}).getUsername()
                    : undefined;
        }
        else {
            authModel = new clientCredentials_1.ClientCredentials();
            const options = { endpoint, auth: authModel.create() };
            const accessToken = yield options.auth.getAccessToken();
            credentials = { accessToken };
            clientId = options.auth.options.clientId;
        }
        log('getCredentials MemberType', body.member);
        res.json({
            credentials,
            userName,
            clientId,
            endpoint,
            projectId,
            waiterServerUrl,
            apiEndpoint,
        });
    }
    catch (err) {
        base_controller_1.errorProsess(res, err);
    }
}));
/**
 * サインイン処理
 * @param {Request} req
 * @param {Response} res
 */
router.get('/signIn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log('signIn');
    if (req.session === undefined) {
        throw new Error('session is undefined');
    }
    delete req.session.auth;
    const authModel = new oAuth2_1.OAuth2(req.session.auth);
    const auth = authModel.create(req);
    const url = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier,
    });
    delete req.session.auth;
    res.json({ url });
}));
/**
 * サインアウト処理
 * @param {Request} req
 * @param {Response} res
 */
router.get('/signOut', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log('signOut');
    if (req.session === undefined || req.session.auth === undefined) {
        res.status(400).json({
            error: {
                message: 'session undefined',
            },
        });
        return;
    }
    const authModel = new oAuth2_1.OAuth2(req.session.auth);
    const auth = authModel.create(req);
    const url = auth.generateLogoutUrl();
    res.json({ url });
}));
/**
 * サインアップ処理
 * @param {Request} req
 * @param {Response} res
 */
router.get('/signUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log('signUp');
    if (req.session === undefined) {
        throw new Error('session is undefined');
    }
    delete req.session.cognito;
    const authModel = new cognitoOAuth2_1.CognitoOAuth2(req.session.cognito);
    const auth = authModel.create(req);
    let url = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier,
    });
    url = url
        .replace(process.env.AUTHORIZATION_CODE_DOMAIN, process.env.COGNITO_AUTHORIZATION_CODE_DOMAIN)
        .replace(/\/authorize/, '/signup');
    delete req.session.cognito;
    res.json({ url });
}));
exports.authorizeRouter = router;
