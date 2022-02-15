/**
 * API
 */

import * as debug from 'debug';
import * as express from 'express';
import * as httpStatus from 'http-status';
import * as moment from 'moment';
const log = debug('sskts-ticket: /api/util');
const router = express.Router();

/**
 * 設定取得
 */
router.get('/config', async (_req, res) => {
    log('config');
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

/**
 * サーバータイム取得
 */
router.get('/serverTime', (_req, res) => {
    log('serverTime');
    res.json({ date: moment().toISOString() });
});

/**
 * バージョン取得
 */
router.get('/version', (_req, res) => {
    log('version');
    res.json({ version: process.env.VERSION });
});

/**
 * ヘルスチェック
 */
router.get('/health', (_req, res) => {
    res.status(httpStatus.OK);
    res.send(`${httpStatus.OK} ${httpStatus[200]}`);
});

export const utilRouter = router;