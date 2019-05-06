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
 * ルーティング
 */
const debug = require("debug");
const path = require("path");
const authorize = require("../controllers/authorize/authorize.controller");
const maintenance = require("../controllers/maintenance/maintenance.controller");
const log = debug('sskts-ticket:maintenance');
exports.default = (app) => {
    app.use((_req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        next();
    });
    app.get('/api/authorize/getCredentials', authorize.getCredentials);
    app.post('/api/authorize/getCredentials', authorize.getCredentials);
    app.get('/api/authorize/signIn', authorize.signIn);
    app.get('/api/authorize/signOut', authorize.signOut);
    app.get('/signIn', authorize.signInRedirect);
    app.get('/signOut', authorize.signOutRedirect);
    app.get('/api/maintenance/excludeTheaters', maintenance.excludeTheaters);
    app.get('/api/maintenance/confirm', maintenance.confirm);
    app.get('/api/version', version);
    app.get('*', (_req, res, _next) => {
        const fileName = (process.env.NODE_ENV === 'production') ? 'production.html' : 'index.html';
        res.sendFile(path.resolve(`${__dirname}/../../../client/${process.env.NODE_ENV}/${fileName}`));
    });
};
/**
 * バージョン情報を取得
 *
 * package.jsonからバージョン情報を取得する
 * @param {Request} _req
 * @param {Response} res
 */
function version(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('version');
        res.json({ version: process.env.VERSION });
    });
}
