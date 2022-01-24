"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const authorize = require("../controllers/authorize/authorize.controller");
const authorize_1 = require("./api/authorize");
const cognito_1 = require("./api/cognito");
const maintenance_1 = require("./api/maintenance");
const util_1 = require("./api/util");
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
        if (/\.(css|js|svg|jpg|png|gif|ico|json|html|txt)/.test(req.path)) {
            res.status(404);
            res.end();
            return;
        }
        next();
    });
    app.use('/api/authorize', authorize_1.authorizeRouter);
    app.use('/api/cognito', cognito_1.cognitoRouter);
    app.get('/signIn', authorize.signInRedirect);
    app.get('/signOut', authorize.signOutRedirect);
    app.use('/api/maintenance', maintenance_1.maintenanceRouter);
    app.use('/api', util_1.utilRouter);
    app.get('*', (_req, res, _next) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/index.html`), {
            lastModified: false,
            etag: false,
        });
    });
};
