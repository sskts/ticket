// tslint:disable:no-http-string
/**
 * 環境変数prod
 */
export const environment = {
    production: true,
    version: '1.0.0',

    REGION: 'ap-northeast-1', // identity poolのリージョンを指定する
    IDENTITY_POOL_ID: 'ap-northeast-1:a8dd7a2a-020c-43d4-9e9f-e49159e89382', // IDENTITY POOLのID(AWS CONSOLEで確認)
    USER_POOL_ID: '',
    CLIENT_ID: '',

    PORTAL_SITE: 'http://www.cinemasunshine.co.jp',
    ENTRANCE_SERVER_URL: 'https://entrance.ticket-cinemasunshine.com',

    CLOSE_THEATERS: ['001'],

    ANALYTICS_ID: 'UA-99018492-6',

    MAIN_SHOP_BRUNCH_CODE: '001',

    PRE_SALE_DIFFERENCE_DAY: '2'

};