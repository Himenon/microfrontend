# @himenon/microfrontend-builder

ビルド用CLI

## 予約された名前と構造

### 予約済みの変数

ライブラリとしてビルドされた成果物をブラウザで読み込むと、`window._External`の名前空間の直下にマージされます。

```js
window._External["lib1"] // lib1という名前のライブラリアクセス
window._External["lib2"] // lib2という名前のライブラリアクセス
```

### 予約済みのファイル・ディレクトリ構造

```
├── dist
├── jest.config.js
├── package.json
├── public
│ └── index.html      // HTMLWebpackPluginのtepmlate
├── src
│ ├── DevServer.tsx   // webpack-dev-serverのエントリーポイント
│ └── index.tsx       // ライブラリとして外側に提供するときのエントリーポイント
└── tsconfig.json
```

## ビルド

2種類のビルド方式があります。

* ライブラリ用ビルド
* アプリケーション用ビルド

### ライブラリ用

* **成果物**
  * 1つのJavaScriptファイルになります。
  * `dist/[LibName].js`に出力されます
  * `index.d.ts`に型定義ファイルが出力されます
  * 成果物を読み込むと、`window._External[libName]`に生成されます
  * cssも一緒にバンドルされます
* **特徴**
  * アプリケーションに組み込まれる前提の生成を行っています
  * 遅延読み込みの対象として扱うため、SSRを前提とした作りではありません
  * SSRの対象にしないでください

### アプリケーション用ビルドの例

* **成果物**
  * コード分割されます

```bash
micrforntend-builder
  --build
  --app
  --external-assets '@himenon/microfrontend-components:MicroComponent,@himenon/microfrontend-tutorial:Tutorial'
```

## webpack-dev-server

`--build`フラグを`--dev-server`に変換するだけで利用可能です。

```bash
micrforntend-builder
  --dev-server
  --app
  --external-assets '@himenon/microfrontend-components:MicroComponent,@himenon/microfrontend-tutorial:Tutorial'
```
