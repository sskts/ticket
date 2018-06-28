# Features


# Usage

* set environment variables - For example,

```shell
set NODE_ENV=**********環境名**********
set NPM_TOKEN=**********npm motionpicture トークン**********
set REDIS_HOST=**********REDISホスト**********
set REDIS_PORT=**********REDISポート**********
set REDIS_KEY=**********REDISキー**********
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

メンテナンス表示

```shell
set MAINTENANCE_TIME=**********メンテナンス期間カンマつなぎ**********
set MAINTENANCE_TEXT=**********メンテナンス文言**********
```

# Build

ビルドは以下で実行できます。
- typescript
```shell
npm run build
```

- scss
```shell
npm run css
```

# Tests

単体テストは以下で実行できます。

```shell
npm test
```

<!-- UIテストは以下で実行できます。

```shell
npm ui-test
``` -->

# JsDoc

```shell
npm run jsdoc
```

`jsdocを作成できます。./docsに出力されます。
