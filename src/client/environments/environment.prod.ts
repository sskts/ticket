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

    PORTAL_SITE: 'https://www.cinemasunshine.co.jp',

    CLOSE_THEATERS: ['001', '007'],

    ANALYTICS_ID: 'UA-99018492-6',

    MAIN_SHOP_BRUNCH_CODE: '001',

    SCHEDULE_STATUS_THRESHOLD_VALUE: '20',
    PRE_SALE_DIFFERENCE_DAY: '2',
    WINDOW_TIME_FROM_VALUE: '0', // 窓口表示開始の値（上映開始時間から相対）
    WINDOW_TIME_FROM_UNIT: 'minutes', // 窓口表示開始の単位（上映開始時間から相対）
    WINDOW_TIME_THROUGH_VALUE: '10', // 窓口表示終了の値（上映開始時間から相対）
    WINDOW_TIME_THROUGH_UNIT: 'minutes' // 窓口表示終了の単位（上映開始時間から相対）

};
