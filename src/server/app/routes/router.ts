/**
 * ルーティング
 */
import * as express from 'express';
import * as path from 'path';
import * as authorize from '../controllers/authorize/authorize.controller';
import { authorizeRouter } from './api/authorize';
import { cognitoRouter } from './api/cognito';
import { maintenanceRouter } from './api/maintenance';
import { utilRouter } from './api/util';

export default (app: express.Application) => {
    app.use((_req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        next();
    });

    app.use('/storage', (req, res) => {
        const url = req.originalUrl.replace(
            '/storage',
            <string>process.env.STORAGE_URL
        );
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

    app.use('/api/authorize', authorizeRouter);
    app.use('/api/cognito', cognitoRouter);
    app.get('/signIn', authorize.signInRedirect);
    app.get('/signOut', authorize.signOutRedirect);
    app.use('/api/maintenance', maintenanceRouter);
    app.use('/api', utilRouter);

    app.get('*', (_req, res, _next) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/index.html`), {
            lastModified: false,
            etag: false,
        });
    });
};
