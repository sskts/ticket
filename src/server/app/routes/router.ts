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
        const url = req.originalUrl.replace('/storage', <string>process.env.STORAGE_URL);
        res.redirect(url);
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
async function version(_req: express.Request, res: express.Response) {
    log('version');
    res.json({ version: process.env.VERSION });
}
