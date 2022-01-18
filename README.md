# Features

# Usage

## Environment variables

| Name                               | Required | Value           | Purpose                             |
| ---------------------------------- | -------- | --------------- | ----------------------------------- |
| `NODE_ENV`                         | true     |                 | 環境名                              |
| `REDIS_HOST`                       | true     |                 | REDIS ホスト                        |
| `REDIS_PORT`                       | true     |                 | REDIS ポート                        |
| `REDIS_KEY`                        | true     |                 | REDIS キー                          |
| `SSKTS_API_ENDPOINT`               | true     |                 | SSKTS API エンドポイント            |
| `CLIENT_CREDENTIALS_CLIENT_ID`     | true     |                 | client id                           |
| `CLIENT_CREDENTIALS_CLIENT_SECRET` | true     |                 | client secret                       |
| `CLIENT_CREDENTIALS_DOMAIN`        | true     |                 | authorize server domain             |
| `AUTHORIZATION_CODE_CLIENT_ID`     | true     |                 | client id oauth2                    |
| `AUTHORIZATION_CODE_CLIENT_SECRET` | true     |                 | client secret oauth2                |
| `AUTHORIZATION_CODE_DOMAIN`        | true     |                 | oauth2 server domain                |
| `ACCOUNT_SITE_DOMAIN`              | true     |                 | account site domain                 |
| `AUTH_REDIRECT_URI`                | true     |                 | サインインリダイレクト URL          |
| `AUTH_LOGUOT_URI`                  | true     |                 | サインアウトリダイレクト URL        |
| `SSKTS_ALLOWED_IPS`                | false    |                 | IP 制限 IP リスト(カンマ区切り)     |
| `SSKTS_BASIC_AUTH_NAME`            | false    |                 | ベーシック認証 ID                   |
| `SSKTS_BASIC_AUTH_PASS`            | false    |                 | ベーシック認証 PASS                 |
| `MAINTENANCE_TIME`                 | false    |                 | メンテナンス期間(カンマ区切り)      |
| `MAINTENANCE_TEXT`                 | false    |                 | メンテナンス文言(BASE64 エンコード) |
| `EXCLUDE_THEATERS_TIME`            | false    |                 | 除外劇場設定期間(カンマ区切り)      |
| `EXCLUDE_THEATERS`                 | false    |                 | 除外劇場コード(カンマ区切り)        |
| `DEBUG`                            | false    | sskts-ticket:\* | デバッグ                            |
| `STORAGE_URL`                      | true     |                 | 外部ストレージ URL                  |
| `SCHEDULE_API_ENDPOINT`            | true     |                 | スケジュール API エンドポイント     |
| `PROJECT_ID`                       | true     |                 | プロジェクト ID                     |
| `ENTRANCE_SERVER_URL`              | true     |                 | ENTRANCE SERVER URL                 |
| `PORTAL_SITE_URL`                  | true     |                 | PORTAL SITE URL                     |
| `TICKET_SITE_URL`                  | true     |                 | TICKET SITE URL                     |
| `COGNITO_REGION`                   | true     |                 | COGNITO REGION                      |
| `COGNITO_IDENTITY_POOL_ID`         | true     |                 | COGNITO IDENTITY POOL ID            |
| `ANALYTICS_ID`                     | true     |                 | ANALYTICS ID                        |
| `CLOSE_THEATERS`                   | false    |                 | 閉館済み施設コード                  |
| `APP_ENV`                          | true     |                 | APP ENV                             |
| `GMO_TOKEN_URL`                    | true     |                 | GMO TOKEN URL                       |

## Azure Environment variables

| Name                           | Required | Value | Purpose                               |
| ------------------------------ | -------- | ----- | ------------------------------------- |
| `WEBSITE_NODE_DEFAULT_VERSION` | true     |       | node.js バージョン                    |
| `WEBSITE_TIME_ZONE`            | true     |       | タイムゾーン設定(Tokyo Standard Time) |

# Build

ビルドは以下で実行できます。

-   typescript

```shell
npm run build
```

# Tests

構文チェックは以下で実行できます。

```shell
npm run check
```

# JsDoc

```shell
npm run jsdoc
```

`jsdoc を作成できます。./docs に出力されます。
