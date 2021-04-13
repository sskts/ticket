# Features


# Usage

## Environment variables

| Name                                | Required | Value            | Purpose                                 |
|-------------------------------------|----------|------------------|-----------------------------------------|
| `NODE_ENV`                          | true     |                  | 環境名                                  |
| `NPM_TOKEN`                         | true     |                  | npm トークン                            |
| `REDIS_HOST`                        | true     |                  | REDISホスト                             |
| `REDIS_PORT`                        | true     |                  | REDISポート                             |
| `REDIS_KEY`                         | true     |                  | REDISキー                               |
| `SSKTS_API_ENDPOINT`                | true     |                  | SSKTS API エンドポイント                 |
| `CLIENT_ID`                         | true     |                  | クライアントID                           |
| `CLIENT_SECRET`                     | true     |                  | クライアントSECRET                       |
| `CLIENT_ID_OAUTH2`                  | true     |                  | OAUTH2クライアントID                     |
| `CLIENT_SECRET_OAUTH2`              | true     |                  | OAUTH2クライアントSECRET                 |
| `AUTHORIZE_SERVER_DOMAIN`           | true     |                  | 認可サーバードメイン                      |
| `OAUTH2_SERVER_DOMAIN`              | true     |                  | OAUTH2認可サーバードメイン                |
| `RESOURCE_SERVER_URL`               | true     |                  | リソースサーバーURL                      |
| `AUTH_REDIRECT_URI`                 | true     |                  | サインインリダイレクトURL                 |
| `AUTH_LOGUOT_URI`                   | true     |                  | サインアウトリダイレクトURL               |
| `SSKTS_ALLOWED_IPS`                 | false    |                  | IP制限IPリスト(カンマ区切り)              |
| `SSKTS_BASIC_AUTH_NAME`             | false    |                  | ベーシック認証ID                         |
| `SSKTS_BASIC_AUTH_PASS`             | false    |                  | ベーシック認証PASS                       |
| `MAINTENANCE_TIME`                  | false    |                  | メンテナンス期間(カンマ区切り)             |
| `MAINTENANCE_TEXT`                  | false    |                  | メンテナンス文言(BASE64エンコード)          |
| `EXCLUDE_THEATERS_TIME`             | false    |                  | 除外劇場設定期間(カンマ区切り)              |
| `EXCLUDE_THEATERS`                  | false    |                  | 除外劇場コード(カンマ区切り)                |
| `DEBUG`                             | false    | sskts-ticket:*   | デバッグ                                |
| `STORAGE_URL`                       | true     |                  | 外部ストレージURL                          |
| `SCHEDULE_API_ENDPOINT`             | true     |                  | スケジュールAPIエンドポイント              |
| `PROJECT_ID`                        | true     |                  | プロジェクトID                                 |
| `ENTRANCE_SERVER_URL`               | true     |                  | ENTRANCE SERVER URL                             |
| `PORTAL_SITE_URL`                   | true     |                  | PORTAL SITE URL                                 |
| `TICKET_SITE_URL`                   | true     |                  | TICKET SITE URL                                 |

## Azure Environment variables

| Name                                | Required | Value            | Purpose                                 |
|-------------------------------------|----------|------------------|-----------------------------------------|
| `WEBSITE_NODE_DEFAULT_VERSION`      | true     |                  | node.jsバージョン                        |
| `WEBSITE_TIME_ZONE`                 | true     |                  | タイムゾーン設定(Tokyo Standard Time)     |


# Build

ビルドは以下で実行できます。
- typescript
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

`jsdocを作成できます。./docsに出力されます。
