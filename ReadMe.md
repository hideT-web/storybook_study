# プロジェクト名（Storybook自己学習サンプル HTML + Vite）

このリポジトリは、HTML/CSS/JSをベースに [Storybook](https://storybook.js.org/) を学習した記録になります。  
Storybook を用いたコンポーネント作成と、本番用 HTML のビルド出力に対応しています。

## 使用技術

- Storybook 8.6.14
- Builder: Vite
- JavaScript（HTMLベース）


## 📁 ディレクトリ構成
```
├── build/ # 本番用HTML出力（自動生成）
├── dist/ # Storybook含めたビルド一式ファイル出力（自動生成）
├── storybook-static # Storybook形式のビルドファイル出力（自動生成）
├── .storybook # 設定ファイル置き場
├── public/ # ルートフォルダ（Storybook用共通ファイルなど）
├── src/
│ ├── assets/ # 共通フォルダ（JS、css、画像など）
│ ├── components/ # 各UIパーツ（Header.jsなど）
│ ├── data/ # JSONやサンプルデータ
│ └── pages/ # ページテンプレート（Top.jsなど）
├── stories/ # ストーリーファイル
├── build.js # 本番HTMLビルドスクリプト
├── build-all.js # Storybook含めた一括ビルド
└── README.md # このファイル
```

## セットアップ

Node.js がインストールされていることを確認してください。

### 1. 依存関係をインストール

```bash
npm i
```
  

--- 
<br><br>
## コマンド一覧
### プロジェクト、初期化
```bash
npm init -y
```
### Storybook本体インストール
```bash
npx storybook@8.6.14 init --builder vite

最新版：npx storybook@latest init --builder vite
```
### storybook起動
```bash
npm run storybook
```
### HTMLタブ--アドオン
```bash
npm install --save-dev @whitespace/storybook-addon-html

main.js設定(HTMLタブ--アドオン)
"@whitespace/storybook-addon-html",

読み込み失敗対策：
npm install react-syntax-highlighter
```
### storybookキャッシュクリア・再起動
```bash
npm run storybook -- --no-manager-cache
```
### ルートの静的ファイルの置き場
```bash
staticDirs: ['../public'], 
```
### main.js(docs設定)
```bash
npm install @storybook/addon-docs --save-dev

  docs: {
    autodocs: true
  },
```
### TypeHTML用ビルド
```bash
npm install fs-extra
npm install archiver

node build.js 
node build_all.js
```
