// tslint:disable:no-http-string
/**
 * 環境変数dev
 */
export const environment = {
    production: false,
    version: '1.0.0',

    region: 'ap-northeast-1', // identity poolのリージョンを指定する

    identityPoolId: 'ap-northeast-1:6a67f523-93c3-4766-b96f-6552f21abd8d', // identity poolのID(AWS consoleで確認)
    userPoolId: '',
    clientId: '',

    rekognitionBucket: 'rekognition-pics',
    albumName: 'usercontent',
    bucketRegion: 'us-east-1',

    ddbTableName: 'LoginTrail',

    cognito_idp_endpoint: '',
    cognito_identity_endpoint: '',
    sts_endpoint: '',

    sasakiAuthDomain: 'sskts-development.auth.ap-northeast-1.amazoncognito.com',
    sasakiAuthRedirectUri: 'https://sskts-ticket-development.azurewebsites.net/assets/signIn.html',
    sasakiAuthLogoutUri: 'https://sskts-ticket-development.azurewebsites.net/assets/signOut.html',
    tokenIssuer: '',
    sasakiAPIEndpoint: 'https://sskts-api-development.azurewebsites.net',

    resourceServerDomain: 'https://sskts-api-development.azurewebsites.net',

    portalSite: 'http://devssktsportal.azurewebsites.net',
    ticketingSite: 'https://sskts-frontend-development.azurewebsites.net',
    entranceServerUrl: 'https://ssktsdevelopment.blob.core.windows.net/entrance',

    analyticsId: 'UA-99018492-4'
};
