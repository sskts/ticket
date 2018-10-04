/**
 * maintenance
 */
import * as debug from 'debug';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { errorProsess } from '../base/base.controller';
const log = debug('sskts-ticket:maintenance');

export async function confirm(_req: Request, res: Response) {
    log('confirm');
    try {
        if (process.env.MAINTENANCE_TIME === undefined
            || process.env.MAINTENANCE_TIME === '') {
            res.json({
                result: false,
                maintenanceText: '',
                startDate: '',
                endDate: ''
            });

            return;
        }
        const maintenanceTime = process.env.MAINTENANCE_TIME.trim().split(',');
        const now = moment().unix();
        const start = moment(maintenanceTime[0]).unix();
        const end = moment(maintenanceTime[1]).unix();
        const maintenanceText = (process.env.MAINTENANCE_TEXT === undefined)
            ? ''
            : process.env.MAINTENANCE_TEXT;
        res.json({
            isMaintenance: (start < now && end > now),
            maintenanceText: new Buffer(maintenanceText, 'base64').toString(),
            startDate: maintenanceTime[0],
            endDate: maintenanceTime[1]
        });

    } catch (err) {
        errorProsess(res, err);
    }
}

export async function excludeTheaters(_req: Request, res: Response) {
    log('excludeTheaters');
    try {
        if (process.env.EXCLUDE_THEATERS_TIME === undefined
            || process.env.EXCLUDE_THEATERS_TIME === ''
            || process.env.EXCLUDE_THEATERS === undefined
            || process.env.EXCLUDE_THEATERS === '') {
            res.json({
                isExclude: false,
                theaters: []
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
            isExclude: (start < now && end > now),
            theaters: theaters
        });

    } catch (err) {
        errorProsess(res, err);
    }
}
