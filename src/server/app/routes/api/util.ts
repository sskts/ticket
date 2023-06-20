/**
 * API
 */

import * as debug from 'debug';
import * as express from 'express';
import * as httpStatus from 'http-status';
import * as moment from 'moment';
// import * as winston from 'winston';
const winston = require('winston');

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
        mypageSiteUrl: process.env.MYPAGE_SITE_URL,
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
        newMembershipTransferUrl: process.env.NEW_MEMBERSHIP_TRANSFER_URL,
        membershipExpirationTimeSeconds:
            process.env.MEMBERSHIP_EXPIRATION_TIME_SECONDS,
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

/**
 * アプリステータス取得
 */
router.get('/application/status', (_req, res) => {
    res.status(httpStatus.OK);
    let status = 'NO_RELEASE';
    const now = moment();
    if (
        process.env.NEW_MEMBERSHIP_COUPON_RELEASE !== undefined &&
        now.unix() > moment(process.env.NEW_MEMBERSHIP_COUPON_RELEASE).unix()
    ) {
        status = 'NEW_MEMBERSHIP_COUPON_RELEASE';
    }
    if (
        process.env.MEMBERSHIP_COUPON_CLOSE !== undefined &&
        now.unix() > moment(process.env.MEMBERSHIP_COUPON_CLOSE).unix()
    ) {
        status = 'MEMBERSHIP_COUPON_CLOSE';
    }
    res.json({
        status,
    });
});

/**
 * ログ出力
 */
router.post('/logging', (req, res) => {
    log('logging');
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [new winston.transports.Console()],
    });
    const level = req.body.level;
    if (level === 'warn') {
        logger.warn('[log] client log', req.body);
        res.json();
        return;
    }
    if (level === 'error') {
        logger.error('[log] client log', req.body);
        res.json();
        return;
    }
    logger.info('[log] client log', req.body);
    res.json();
});

export const utilRouter = router;
