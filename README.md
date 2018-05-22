# Features


# Usage

* set environment variables - For example,

```shell
set NODE_ENV=**********環境名**********
set NPM_TOKEN=**********npm motionpicture トークン**********
set SSKTS_API_ENDPOINT=**********mp apiのエンドポイント**********
set REDIS_HOST=**********REDISホスト**********
set REDIS_PORT=**********REDISポート**********
set REDIS_KEY=**********REDISキー**********
set GMO_ENDPOINT=**********gmo apiのエンドポイント**********
set CLIENT_ID=**********クライアントID**********
set CLIENT_SECRET=**********クライアント鍵**********
set AUTHORIZE_SERVER_DOMAIN=**********認証サーバードメイン**********
set RESOURCE_SERVER_URL=**********リソースサーバーURL**********
set CLIENT_ID_OAUTH2=**********会員クライアントID**********
set CLIENT_SECRET_OAUTH2=**********会員クライアント鍵**********
set OAUTH2_SERVER_DOMAIN=**********会員認証サーバードメイン**********
set AUTH_REDIRECT_URI=**********会員サインインリダイレクトURL**********
set AUTH_LOGUOT_URI=h**********会員サインアウトリダイレクトURL**********
```

only on Aure WebApps

```shell
set WEBSITE_NODE_DEFAULT_VERSION=**********node.jsバージョン**********
set WEBSITE_TIME_ZONE=Tokyo Standard Time
```

IP制限をかけたい場合

```shell
set SSKTS_ALLOWED_IPS=**********カンマつなぎのIPリスト**********
```

ベーシック認証をかけたい場合

```shell
set SSKTS_BASIC_AUTH_NAME=**********認証ユーザー名**********
set SSKTS_BASIC_AUTH_PASS=**********認証パスワード**********
```

# Build

ビルドは以下で実行できます。
- typescript
```shell
npm run build
```

# JsDoc

```shell
npm run jsdoc
```

`jsdocを作成できます。./docsに出力されます。
