// tslint:disable:no-http-string
/**
 * 環境変数dev
 */
export const environment = {
    production: false,
    version: '1.0.0',

    REGION: 'ap-northeast-1', // identity poolのリージョンを指定する
    IDENTITY_POOL_ID: 'ap-northeast-1:6a67f523-93c3-4766-b96f-6552f21abd8d', // IDENTITY POOLのID(AWS CONSOLEで確認)
    USER_POOL_ID: '',
    CLIENT_ID: '',

    PORTAL_SITE: 'http://devssktsportal.azurewebsites.net',
    ENTRANCE_SERVER_URL: 'https://d2n1h4enbzumbc.cloudfront.net',

    CLOSE_THEATERS: ['101'],

    ANALYTICS_ID: 'UA-99018492-4',

    MAIN_SHOP_BRUNCH_CODE: '101',

    PRE_SALE_DIFFERENCE_DAY: '2',
    WINDOW_TIME_FROM_VALUE: '0', // 窓口表示開始の値（上映開始時間から相対）
    WINDOW_TIME_FROM_UNIT: 'minutes', // 窓口表示開始の単位（上映開始時間から相対）
    WINDOW_TIME_THROUGH_VALUE: '10', // 窓口表示終了の値（上映開始時間から相対）
    WINDOW_TIME_THROUGH_UNIT: 'minutes' // 窓口表示終了の単位（上映開始時間から相対）

};
