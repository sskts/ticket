/**
 * 抽象認証クライアント
 */
export abstract class AuthClient {
    public abstract fetch(
        url: string,
        options: RequestInit,
        expectedStatusCodes: number[]
    ): Promise<Response>;
    public abstract getAccessToken(): Promise<string>;
}
