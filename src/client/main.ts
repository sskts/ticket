/**
 * main
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as moment from 'moment-timezone';

moment.tz.setDefault('Asia/Tokyo');
moment.locale('ja');

/**
 * 設定保存
 */
async function setConfig() {
    const fetchResult = await fetch(
        `/api/config?date=${moment().toISOString()}`,
        {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }
    );
    if (!fetchResult.ok) {
        throw new Error(
            JSON.stringify({
                status: fetchResult.status,
                statusText: fetchResult.statusText,
            })
        );
    }
    const result: {
        scheduleApiEndpoint: string;
        cmsApiEndpoint: string;
        portalSiteUrl: string;
        entranceServerUrl: string;
        ticketSiteUrl: string;
        cognitoRegion: string;
        cognitoIdentityPoolId: string;
        analyticsId: string;
        closeTheaters: string[];
        env: string;
        gmoTokenUrl?: string;
    } = await fetchResult.json();
    if (result.gmoTokenUrl !== undefined) {
        const script = document.createElement('script');
        script.src = result.gmoTokenUrl;
        document.body.appendChild(script);
    }
    document.body.classList.add(result.env);
    sessionStorage.setItem('CONFIG', JSON.stringify(result));
}

async function main() {
    await setConfig();
}

main()
    .then(async () => {
        if (environment.production) {
            enableProdMode();
        }
        platformBrowserDynamic().bootstrapModule(AppModule);
    })
    .catch((error) => {
        console.error(error);
    });
