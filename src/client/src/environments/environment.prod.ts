// tslint:disable:no-http-string
/**
 * 環境変数prod
 */
export const environment = {
    production: true,
    version: '1.0.0',

    region: 'ap-northeast-1', // identity poolのリージョンを指定する

    identityPoolId: 'ap-northeast-1:a8dd7a2a-020c-43d4-9e9f-e49159e89382', // identity poolのID(AWS consoleで確認)
    userPoolId: '',
    clientId: '',

    rekognitionBucket: 'rekognition-pics',
    albumName: 'usercontent',
    bucketRegion: 'us-east-1',

    ddbTableName: 'LoginTrail',

    cognito_idp_endpoint: '',
    cognito_identity_endpoint: '',
    sts_endpoint: '',

    sasakiAuthDomain: 'sskts-production.auth.ap-northeast-1.amazoncognito.com',
    sasakiAuthRedirectUri: 'https://sskts-ticket-production.azurewebsites.net/signIn',
    sasakiAuthLogoutUri: 'https://sskts-ticket-production.azurewebsites.net/signOut',
    tokenIssuer: 'https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_bQcyLA7Jq',
    sasakiAPIEndpoint: 'https://sskts-api-production.azurewebsites.net',

    resourceServerDomain: 'https://sskts-api-production.azurewebsites.net',

    portalSite: 'http://www.cinemasunshine.co.jp',
    ticketingSite: 'https://ticket-cinemasunshine.com',
    entranceServerUrl: 'https://entrance.ticket-cinemasunshine.com',

    analyticsId: 'UA-99018492-6'
};
