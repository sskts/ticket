/**
 * オブジェクトをクエリストリングへ変換
 */
export function object2query(params: Object) {
    let query = '';
    for (let i = 0; i < Object.keys(params).length; i++) {
        const key = Object.keys(params)[i];
        const value = (<any>params)[key];
        if (i > 0) {
            query += '&';
        }
        query += `${key}=${value}`;
    }
    return query;
}

/**
 * N秒待つ
 */
export async function sleep(time = 3000) {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), time);
    });
}

/**
 * 設定取得
 */
export function getConfig(): {
    scheduleApiEndpoint: string;
    cmsApiEndpoint: string;
    portalSiteUrl: string;
    entranceServerUrl: string;
    ticketSiteUrl: string;
} {
    const json = sessionStorage.getItem('CONFIG');
    return (json === null)
        ? {
            scheduleApiEndpoint: '',
            cmsApiEndpoint: '',
            portalSiteUrl: '',
            entranceServerUrl: '',
            ticketSiteUrl: '',
        }
        : JSON.parse(json);
}
