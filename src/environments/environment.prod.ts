/**
 * 環境変数prod
 */
export const environment = {
    production: true,
    version: '1.0.0',

    region: 'ap-northeast-1', // identity poolのリージョンを指定する

    identityPoolId: 'ap-northeast-1:6a67f523-93c3-4766-b96f-6552f21abd8d', // identity poolのID(AWS consoleで確認)
    userPoolId: 'ap-northeast-1_bQcyLA7Jq',
    clientId: '5b7cliq3435qf72gvt6sh0otui',

    rekognitionBucket: 'rekognition-pics',
    albumName: 'usercontent',
    bucketRegion: 'us-east-1',

    ddbTableName: 'LoginTrail',

    cognito_idp_endpoint: '',
    cognito_identity_endpoint: '',
    sts_endpoint: '',
    dynamodb_endpoint: '',
    s3_endpoint: '',

    sasakiAuthDomain: 'sskts-development.auth.ap-northeast-1.amazoncognito.com',
    sasakiAuthRedirectUri: 'https://sskts-ticket-development.azurewebsites.net/signIn',
    sasakiAuthLogoutUri: 'https://sskts-ticket-development.azurewebsites.net/signOut',
    tokenIssuer: 'https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_bQcyLA7Jq',
    sasakiAPIEndpoint: 'https://sskts-api-development.azurewebsites.net',

    resourceServerDomain: 'https://sskts-api-development.azurewebsites.net',

    // tslint:disable-next-line:no-http-string
    portalSite: 'http://www.cinemasunshine.co.jp',
    // tslint:disable-next-line:no-http-string
    ticketingSite: 'https://sskts-frontend-development.azurewebsites.net',

    analyticsId: ''
};
