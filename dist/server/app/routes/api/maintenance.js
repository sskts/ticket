"use strict";
/**
 * API
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express = require("express");
const moment = require("moment");
const base_controller_1 = require("../../controllers/base/base.controller");
const log = debug('sskts-ticket: /api/maintenance');
const router = express.Router();
/**
 * メンテナンス確認
 */
router.get('/confirm', (_req, res) => __awaiter(this, void 0, void 0, function* () {
    log('config');
    try {
        if (process.env.MAINTENANCE_TIME === undefined ||
            process.env.MAINTENANCE_TIME === '') {
            res.json({
                result: false,
                maintenanceText: '',
                startDate: '',
                endDate: '',
            });
            return;
        }
        const maintenanceTime = process.env.MAINTENANCE_TIME.trim().split(',');
        const now = moment().unix();
        const start = moment(maintenanceTime[0]).unix();
        const end = moment(maintenanceTime[1]).unix();
        const maintenanceText = process.env.MAINTENANCE_TEXT === undefined
            ? ''
            : process.env.MAINTENANCE_TEXT;
        res.json({
            isMaintenance: start < now && end > now,
            maintenanceText: new Buffer(maintenanceText, 'base64').toString(),
            startDate: maintenanceTime[0],
            endDate: maintenanceTime[1],
        });
    }
    catch (err) {
        base_controller_1.errorProsess(res, err);
    }
}));
/**
 * 除外劇場
 */
router.get('/excludeTheaters', (_req, res) => __awaiter(this, void 0, void 0, function* () {
    log('excludeTheaters');
    try {
        if (process.env.EXCLUDE_THEATERS_TIME === undefined ||
            process.env.EXCLUDE_THEATERS_TIME === '' ||
            process.env.EXCLUDE_THEATERS === undefined ||
            process.env.EXCLUDE_THEATERS === '') {
            res.json({
                isExclude: false,
                theaters: [],
            });
            return;
        }
        const excludeTime = process.env.EXCLUDE_THEATERS_TIME.trim().split(',');
        const now = moment().unix();
        const start = moment(excludeTime[0]).unix();
        const end = moment(excludeTime[1]).unix();
        const theaters = process.env.EXCLUDE_THEATERS.trim().split(',');
        // log(`(${start} < ${now} && ${end} > ${now})`);
        res.json({
            isExclude: start < now && end > now,
            theaters: theaters,
        });
    }
    catch (err) {
        base_controller_1.errorProsess(res, err);
    }
}));
exports.maintenanceRouter = router;
