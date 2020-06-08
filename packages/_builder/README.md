# @himenon/microfrontend-builder

ビルド用CLI

## 予約ファイル・予約ディレクトリ

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
* **特徴**
  * アプリケーションに組み込まれる前提の生成を行っています

### アプリケーション用ビルドの例

* **成果物**: Code Splitされます。
* 

```bash
micrforntend-builder
  --build
  --app
  --external-assets '@himenon/microfrontend-components:MicroComponent,@himenon/microfrontend-tutorial:Tutorial'
```

## webpack-dev-server

* ライブラリ用ビルド
* アプリケーション用ビルド

```bash
micrforntend-builder
  --dev-server
  --app
  --external-assets '@himenon/microfrontend-components:MicroComponent,@himenon/microfrontend-tutorial:Tutorial'
```