/**
 * 環境変数
 */
export const environment = {
    production: true,
    SCHEDULE_STATUS_THRESHOLD_VALUE: '20',
    PRE_SALE_DIFFERENCE_DAY: '2',
    WINDOW_TIME_FROM_VALUE: '0', // 窓口表示開始の値（上映開始時間から相対）
    WINDOW_TIME_FROM_UNIT: 'minutes', // 窓口表示開始の単位（上映開始時間から相対）
    WINDOW_TIME_THROUGH_VALUE: '10', // 窓口表示終了の値（上映開始時間から相対）
    WINDOW_TIME_THROUGH_UNIT: 'minutes', // 窓口表示終了の単位（上映開始時間から相対）
};
