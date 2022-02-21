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
const cognitoOAuth2_1 = require("../../models/auth/session/cognitoOAuth2");
const router = express.Router();
const log = debug('sskts-ticket:api/cognito');
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
        let userName;
        let credentials;
        const authModel = new cognitoOAuth2_1.CognitoOAuth2(req.session.cognito);
        const options = { auth: authModel.create() };
        const accessToken = yield options.auth.getAccessToken();
        authModel.credentials = options.auth.credentials;
        authModel.save(req.session);
        credentials = { accessToken };
        userName = options.auth.verifyIdToken({}).getUsername();
        res.json({
            credentials,
            userName,
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
    delete req.session.cognito;
    const authModel = new cognitoOAuth2_1.CognitoOAuth2(req.session.cognito);
    const auth = authModel.create();
    const url = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier,
    });
    delete req.session.cognito;
    res.json({ url });
}));
/**
 * サインアウト処理
 * @param {Request} req
 * @param {Response} res
 */
router.get('/signOut', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log('signOut');
    if (req.session === undefined || req.session.cognito === undefined) {
        res.status(400).json({
            error: {
                message: 'session undefined',
            },
        });
        return;
    }
    const authModel = new cognitoOAuth2_1.CognitoOAuth2(req.session.cognito);
    const auth = authModel.create();
    const url = auth.generateLogoutUrl();
    res.json({ url });
}));
exports.cognitoRouter = router;
