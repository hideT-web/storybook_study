import { execSync } from 'child_process';
import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import archiver from 'archiver';

const pipe = promisify(pipeline);

const buildDir = path.resolve('./build');
const storybookDir = path.resolve('./storybook-static');
const distDir = path.resolve('./dist');
const zipFile = path.resolve('./dist/site.zip');

async function main() {
  console.log('=== 本番用HTMLビルドを開始 ===');
  try {
    execSync('node build.js', { stdio: 'inherit' });
  } catch (err) {
    console.error('本番用ビルドに失敗しました:', err);
    process.exit(1);
  }

  console.log('=== Storybookビルドを開始 ===');
  try {
    execSync('npm run build-storybook', { stdio: 'inherit' });
  } catch (err) {
    console.error('Storybookビルドに失敗しました:', err);
    process.exit(1);
  }

  console.log('=== /dist にまとめ中 ===');
  fsExtra.removeSync(distDir);
  fsExtra.mkdirSync(distDir);

  fsExtra.copySync(buildDir, path.join(distDir, 'build'));
  fsExtra.copySync(storybookDir, path.join(distDir, 'storybook'));

  console.log('=== ZIP 圧縮開始 ===');
  const output = fs.createWriteStream(zipFile);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`dist 完了！ZIP サイズ: ${(archive.pointer() / 1024).toFixed(2)} KB`);
    console.log(`dist フォルダ: ${distDir}`);
    console.log(` ZIP ファイル: ${zipFile}`);
  });

  archive.on('error', err => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(distDir, false);

  await archive.finalize();
}

main().catch(err => {
  console.error('ビルドスクリプトでエラーが発生しました:', err);
  process.exit(1);
});
