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
 * ルーティング
 */
const debug = require("debug");
const moment = require("moment");
const path = require("path");
const authorize = require("../controllers/authorize/authorize.controller");
const maintenance = require("../controllers/maintenance/maintenance.controller");
const log = debug('sskts-ticket:maintenance');
exports.default = (app) => {
    app.use((_req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        next();
    });
    app.use('/storage', (req, res) => {
        const url = req.originalUrl.replace('/storage', process.env.STORAGE_URL);
        res.redirect(url);
    });
    app.use((req, res, next) => {
        if ((/\.(css|js|svg|jpg|png|gif|ico|json|html|txt)/).test(req.path)) {
            res.status(404);
            res.end();
            return;
        }
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
    app.get('/api/config', (_req, res) => {
        res.json({
            scheduleApiEndpoint: process.env.SCHEDULE_API_ENDPOINT,
            cmsApiEndpoint: process.env.CMS_API_ENDPOINT,
            portalSiteUrl: process.env.PORTAL_SITE_URL,
            entranceServerUrl: process.env.ENTRANCE_SERVER_URL,
            ticketSiteUrl: process.env.TICKET_SITE_URL,
        });
    });
    app.get('/api/serverTime', (_req, res) => { res.json({ date: moment().toISOString() }); });
    app.get('*', (_req, res, _next) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/${process.env.NODE_ENV}/index.html`));
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
