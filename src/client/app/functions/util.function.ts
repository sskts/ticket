/**
 * オブジェクトをクエリストリングへ変換
 */
export function object2query(params: Object) {
    let query = '';
    for (let i = 0; i < Object.keys(params).length; i++) {
        const key = Object.keys(params)[i];
        const value = (<any>params)[key];
        if (value === undefined) {
            continue;
        }
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
    mypageSiteUrl: string;
    entranceServerUrl: string;
    ticketSiteUrl: string;
    cognitoRegion: string;
    cognitoIdentityPoolId: string;
    analyticsId: string;
    closeTheaters: string[];
    env: string;
    gmoTokenUrl: string;
} {
    const json = sessionStorage.getItem('CONFIG');
    return json === null
        ? {
              scheduleApiEndpoint: '',
              cmsApiEndpoint: '',
              portalSiteUrl: '',
              mypageSiteUrl: '',
              entranceServerUrl: '',
              ticketSiteUrl: '',
              cognitoRegion: '',
              cognitoIdentityPoolId: '',
              analyticsId: '',
              closeTheaters: [],
              env: '',
              gmoTokenUrl: '',
          }
        : JSON.parse(json);
}

export function getStorageItem<T>(params: {
    storageType: 'sessionStorage' | 'localStorage';
    key: string;
}) {
    try {
        const { storageType, key } = params;
        const item = window[storageType].getItem(key);
        if (item === null) {
            throw new Error('item null');
        }
        return <T>JSON.parse(item);
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
