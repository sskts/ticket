/**
 * OAuth2クライアント
 */
import OAuth2client from './oAuth2client';

/**
 * cognito OAuth2 client
 */
export default class CognitoOAuth2client extends OAuth2client {
    /**
     * The base URL for auth endpoints.
     */
    protected readonly OAUTH2_AUTH_BASE_URI: string = '/authorize';

    /**
     * The base endpoint for token retrieval.
     */
    protected readonly OAUTH2_TOKEN_URI: string = '/token';

    /**
     * The base endpoint to revoke tokens.
     */
    protected readonly OAUTH2_LOGOUT_URI: string = '/logout';
}
