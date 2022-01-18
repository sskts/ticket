/**
 * ルーティング
 */
import * as debug from 'debug';
import * as express from 'express';
import * as moment from 'moment';
import * as path from 'path';
import * as authorize from '../controllers/authorize/authorize.controller';
import * as maintenance from '../controllers/maintenance/maintenance.controller';
const log = debug('sskts-ticket:maintenance');

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

    app.get('/api/authorize/getCredentials', authorize.getCredentials);
    app.post('/api/authorize/getCredentials', authorize.getCredentials);
    app.get('/api/authorize/signIn', authorize.signIn);
    app.get('/api/authorize/signOut', authorize.signOut);
    app.get('/api/authorize/signUp', authorize.signUp);
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
            cognitoRegion: process.env.COGNITO_REGION,
            cognitoIdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
            analyticsId: process.env.ANALYTICS_ID,
            closeTheaters:
                process.env.CLOSE_THEATERS === undefined ||
                process.env.CLOSE_THEATERS === ''
                    ? []
                    : process.env.CLOSE_THEATERS.replace(/\s/g, '').split(','),
            env:
                process.env.APP_ENV === undefined || process.env.APP_ENV === ''
                    ? 'production'
                    : process.env.APP_ENV,
            gmoTokenUrl:
                process.env.GMO_TOKEN_URL === undefined ||
                process.env.GMO_TOKEN_URL === ''
                    ? undefined
                    : process.env.GMO_TOKEN_URL,
        });
    });
    app.get('/api/serverTime', (_req, res) => {
        res.json({ date: moment().toISOString() });
    });

    app.get('*', (_req, res, _next) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/index.html`), {
            lastModified: false,
            etag: false,
        });
    });
};

/**
 * バージョン情報を取得
 *
 * package.jsonからバージョン情報を取得する
 * @param {Request} _req
 * @param {Response} res
 */
async function version(_req: express.Request, res: express.Response) {
    log('version');
    res.json({ version: process.env.VERSION });
}
