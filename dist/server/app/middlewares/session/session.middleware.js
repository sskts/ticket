"use strict";
/**
 * セッション
 */
Object.defineProperty(exports, "__esModule", { value: true });
const connectRedis = require("connect-redis");
const session = require("express-session");
const redis = require("redis");
const createDebug = require("debug");
const debug = createDebug('sskts-ticket:session');
const redisClient = redis.createClient({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_KEY,
    tls: process.env.REDIS_TLS_SERVERNAME === undefined ||
        process.env.REDIS_TLS_SERVERNAME === ''
        ? undefined
        : {
            servername: process.env.REDIS_TLS_SERVERNAME,
        },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return_buffers: true,
});
debug('redis host...', process.env.REDIS_HOST);
const sessionStore = new (connectRedis(session))({ client: redisClient });
exports.default = session({
    secret: 'sskts-ticket-session-secret',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: process.env.SESSION_COOKIE_MAX_AGE === undefined ||
            process.env.SESSION_COOKIE_MAX_AGE === ''
            ? 604800000 // 7 * 24 * 60 * 60 * 1000
            : Number(process.env.SESSION_COOKIE_MAX_AGE),
    },
});
