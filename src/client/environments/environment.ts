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

    REKOGNITION_BUCKET: 'rekognition-pics',
    ALBUM_NAME: 'usercontent',
    BUCKET_REGION: 'us-east-1',
    DDB_TABLE_NAME: 'LoginTrail',
    TOKEN_ISSUER: '',

    PORTAL_SITE: 'http://devssktsportal.azurewebsites.net',
    ENTRANCE_SERVER_URL: 'https://d2n1h4enbzumbc.cloudfront.net',

    CLOSE_THEATERS: ['101'],

    ANALYTICS_ID: 'UA-99018492-4',

    PRE_SALE_DIFFERENCE_DAY: '2'

};
