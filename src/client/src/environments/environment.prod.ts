// tslint:disable:no-http-string
/**
 * 環境変数prod
 */
export const environment = {
    production: true,
    version: '1.0.0',

    SSKTS_API_ENDPOINT: 'https://sskts-api-production.azurewebsites.net',

    REGION: 'ap-northeast-1', // identity poolのリージョンを指定する
    IDENTITY_POOL_ID: 'ap-northeast-1:a8dd7a2a-020c-43d4-9e9f-e49159e89382', // IDENTITY POOLのID(AWS CONSOLEで確認)
    USER_POOL_ID: '',
    CLIENT_ID: '',

    REKOGNITION_BUCKET: 'rekognition-pics',
    ALBUM_NAME: 'usercontent',
    BUCKET_REGION: 'us-east-1',

    DDB_TABLE_NAME: 'LoginTrail',

    SASAKI_AUTH_DOMAIN: 'sskts-production.auth.ap-northeast-1.amazoncognito.com',
    TOKEN_ISSUER: '',

    RESOURCE_SERVER_DOMAIN: 'https://sskts-api-production.azurewebsites.net',

    PORTAL_SITE: 'http://productionssktsportal.azurewebsites.net',
    ENTRANCE_SERVER_URL: 'https://entrance.ticket-cinemasunshine.com',

    ANALYTICS_ID: 'UA-99018492-6'

};
