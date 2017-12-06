// tslint:disable:no-http-string
/**
 * 環境変数test
 */
export const environment = {
    production: false,
    version: '1.0.0',

    region: 'ap-northeast-1', // identity poolのリージョンを指定する

    identityPoolId: 'ap-northeast-1:b153d3f1-5e67-468e-8c69-ab938cf3d21e', // identity poolのID(AWS consoleで確認)
    userPoolId: '',
    clientId: '',

    rekognitionBucket: 'rekognition-pics',
    albumName: 'usercontent',
    bucketRegion: 'us-east-1',

    ddbTableName: 'LoginTrail',

    cognito_idp_endpoint: '',
    cognito_identity_endpoint: '',
    sts_endpoint: '',

    sasakiAuthDomain: 'sskts-test.auth.ap-northeast-1.amazoncognito.com',
    sasakiAuthRedirectUri: 'https://sskts-ticket-test.azurewebsites.net/signIn',
    sasakiAuthLogoutUri: 'https://sskts-ticket-test.azurewebsites.net/signOut',
    tokenIssuer: '',
    sasakiAPIEndpoint: 'https://sskts-api-test.azurewebsites.net',

    resourceServerDomain: 'https://sskts-api-test.azurewebsites.net',

    portalSite: 'http://testssktsportal.azurewebsites.net',
    ticketingSite: 'https://sskts-frontend-test.azurewebsites.net',
    entranceServerUrl: 'https://d24x7394fq3aqi.cloudfront.net',

    analyticsId: 'UA-99018492-5'
};
