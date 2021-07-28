// tslint:disable:no-http-string
/**
 * 環境変数test
 */
export const environment = {
    production: false,
    version: '1.0.0',

    REGION: 'ap-northeast-1', // identity poolのリージョンを指定する
    IDENTITY_POOL_ID: 'ap-northeast-1:b153d3f1-5e67-468e-8c69-ab938cf3d21e', // IDENTITY POOLのID(AWS CONSOLEで確認)
    USER_POOL_ID: '',
    CLIENT_ID: '',

    REKOGNITION_BUCKET: 'rekognition-pics',
    ALBUM_NAME: 'usercontent',
    BUCKET_REGION: 'us-east-1',

    DDB_TABLE_NAME: 'LoginTrail',
    TOKEN_ISSUER: '',

    PORTAL_SITE: 'https://ssk-portal2018-frontend-win-test.azurewebsites.net',

    CLOSE_THEATERS: ['101', '107'],

    ANALYTICS_ID: 'UA-99018492-5',

    MAIN_SHOP_BRUNCH_CODE: '121',

    SCHEDULE_STATUS_THRESHOLD_VALUE: '20',
    PRE_SALE_DIFFERENCE_DAY: '2',
    WINDOW_TIME_FROM_VALUE: '0', // 窓口表示開始の値（上映開始時間から相対）
    WINDOW_TIME_FROM_UNIT: 'minutes', // 窓口表示開始の単位（上映開始時間から相対）
    WINDOW_TIME_THROUGH_VALUE: '10', // 窓口表示終了の値（上映開始時間から相対）
    WINDOW_TIME_THROUGH_UNIT: 'minutes' // 窓口表示終了の単位（上映開始時間から相対）

};
