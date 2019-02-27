const webpack = require('webpack');
const Multispinner = require('multispinner');
const del = require('del');

const mainConfig = require('./webpack.main.config');
const rendererConfig = require('./webpack.renderer.config');

build();

function build() {
  del.sync(['dist', '!.gitkeep']);

  const tasks = ['main', 'renderer'];
  const m = new Multispinner(tasks, {
    preText: 'building',
    postText: 'process'
  });

  let results = '';
  m.on('success', () => {
    process.stdout.write('\x1B[2J\x1B[0f');
    console.log(`\n\n${results}`);
  });

  pack(mainConfig).then(result => {
    results += result + '\n\n';
    m.success('main');
  }).catch(err => {
    m.error('main');
    console.log(`\n Failed to build main process`);
    console.error(`\n${err}\n`);
    process.exit(1);
  });

  pack(rendererConfig).then(result => {
    results += result + '\n\n';
    m.success('renderer');
  }).catch(err => {
    m.error('renderer');
    console.log(`\n Failed to build main process`);
    console.error(`\n${err}\n`);
    process.exit(1);
  });
}

function pack(config) {
  return new Promise((resolve, reject) => {
    config.mode = 'development';
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err)
      else if (stats.hasErrors()) {
        let err = '';

        stats.toString({
          chunks: false,
          colors: true
        })
        .split(/\r?\n/)
        .forEach(line => err += ` ${line}\n`);

        reject(err);
      } else {
        resolve(stats.toString({
          chunks: false,
          colors: true
        }));
      }
    });
  });
}