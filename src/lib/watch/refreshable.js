const chokidar = require('chokidar');
const { resolve } = require('path');
const { CONSTANTS } = require('@lib/helpers');
const { broadcash } = require('./broadcash');

function refreshable() {
  const watcher = chokidar.watch('./src/lib/response/*', {
    ignored: /node_modules[\\/]/,
    ignoreInitial: true,
    persistent: true
  });
  watcher.add('./src/lib/util/*');
  watcher.on('all', (event, path) => {
    console.log(event);
    delete require.cache[require.resolve(resolve(CONSTANTS.ROOTPATH, path))];
    broadcash();
  });
}

module.exports.refreshable = refreshable;
