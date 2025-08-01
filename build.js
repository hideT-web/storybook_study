import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import { listUsers } from './src/data/Users.js';
import { pathToFileURL } from 'url';

const pages = {
  Top: 'トップページ',
  // 追加したいページがあればここに
};

const pageProps = {
  Top: {
    titleText: 'マイサイト',
    subtitleText: 'ようこそ！',
    menuItems: ['ホーム', 'サービス', '会社情報', 'お問い合わせ'],
    copyright: 'マイサイト',
    users: listUsers,
    children: '<p>ここがメインのコンテンツです。</p>'
  }
  /* 他ページあれば
  ,About: {
    titleText: '会社情報',
    subtitleText: '私たちについて',
    menuItems: ['ホーム', 'サービス', '会社情報', 'お問い合わせ'],
    copyright: 'マイサイト',
    users: [], // Aboutページでは使わないなら空でもOK
    children: '<p>ここに会社の説明が入ります。</p>'
  }*/
};

const sharedCSS = ['header.css', 'menu.css', 'userlist.css', 'footer.css'];
const buildDir = path.resolve('./build');
const dataDir = path.resolve('./src/data');
const assetsDir = path.resolve('./src/assets');
const cssOutputDir = path.join(buildDir,'assets','css');

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

if (fs.existsSync(assetsDir)) {
  const destAssetsDir = path.join(buildDir, 'assets');
  fsExtra.copySync(assetsDir, destAssetsDir);
  console.log('/src/assets 配下を build/assets にコピーしました');
} else {
  console.warn('/src/assets ディレクトリが見つかりません');
}
// dataフォルダをコピー
if (fs.existsSync(dataDir)) {
  const destDataDir = path.join(buildDir, 'data');
  fsExtra.copySync(dataDir, destDataDir);
  console.log('/src/data 配下を build/data/ にコピーしました');
} else {
  console.warn('/src/data ディレクトリが見つかりません');
}

if (!fs.existsSync(cssOutputDir)) {
  fs.mkdirSync(cssOutputDir);
}

// 各ページごとのHTML生成とCSSコピー
for (const [name, title] of Object.entries(pages)) {
  const pagePath = `./src/pages/${name}.js`;
  const pageCSSPath = `./src/pages/${name}.css`;
  let pageCSSLink = '';

  if (!fs.existsSync(pagePath)) {
    console.warn(`${pagePath} が見つかりません。スキップします。`);
    continue;
  }

  // ページ専用CSSがあればコピーし、HTMLにもリンクを追加
  if (fs.existsSync(pageCSSPath)) {
    const dest = path.join(cssOutputDir, `${name}.css`);
    fs.copyFileSync(pageCSSPath, dest);
    pageCSSLink = `<link rel="stylesheet" href="../assets/css/${name}.css">`;
    console.log(`${name}.css をコピーしました`);
  } else {
    console.warn(`${name}.css が見つかりません`);
  }

  const { [name]: render } = await import(pathToFileURL(pagePath).href);
  const props = pageProps[name] || {};

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <link rel="icon" href="../assets/icon/favicon.svg">
  <link rel="stylesheet" href="../assets/css/style.css">
  
  ${sharedCSS.map(css => `<link rel="stylesheet" href="../assets/css/${css}">`).join('\n  ')}
  ${pageCSSLink}
</head>
<body>
  ${render(props)}
  <script src="../assets/js/index.js" type="module"></script>
</body>
</html>`;

  const pageDir = path.join(buildDir, name);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir);
  }
  fs.writeFileSync(path.join(pageDir, `${name}.html`), html);
  console.log(`${name}.html を出力しました`);
}

// 共通CSSのコピー
for (const css of sharedCSS) {
  const src = `./src/components/${css}`;
  const dest = path.join(cssOutputDir, css);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`${css} をコピーしました`);
  } else {
    console.warn(`${css} が見つかりません`);
  }
}

console.log('ビルド完了！ build/ に HTML と CSS が出力されました。');
