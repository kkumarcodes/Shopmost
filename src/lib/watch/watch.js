const chokidar = require('chokidar');
const { resolve } = require('path');
const { CONSTANTS } = require('@lib/helpers');
const { existsSync } = require('fs');
const { getConfig } = require('@lib/util/getConfig');

function watch(calbacks = []) {
  const watcher = chokidar.watch(resolve(CONSTANTS.ROOTPATH, 'extensions/**'), {
    //ignored: /node_modules[\\/]/,
    ignoreInitial: true,
    persistent: true
  });

  if (existsSync(resolve(CONSTANTS.ROOTPATH, ''))) {
    watcher.add(resolve(CONSTANTS.ROOTPATH, 'src/**'));
  }

  // Watch themes folder
  const theme = getConfig('system.theme');
  if (theme && existsSync(resolve(CONSTANTS.ROOTPATH, 'themes', theme))) {
    watcher.add(resolve(CONSTANTS.ROOTPATH, 'themes', theme, '**'));
  }

  watcher.on('all', (event, path) => {
    calbacks.forEach((callback) => {
      callback(event, path);
    });
  });
}

module.exports.watch = watch;
