/**
 * OAuth認証情報
 */
interface ICredentials {
    /**
     * リフレッシュトークン
     */
    refresh_token?: string;
    /**
     * 期限UNIXタイムスタンプ
     */
    expiry_date?: number;
    /**
     * アクセストークン
     */
    access_token?: string;
    /**
     * IDトークン
     */
    id_token?: string;
    /**
     * トークンタイプ
     */
    token_type?: string;
    refreshToken?: string;
    expiryDate?: number;
    expiresIn?: number;
    accessToken?: string;
    tokenType?: string;
    idToken?: string;
    idTokenPayload?: any;
    state?: string;
}
export default ICredentials;
