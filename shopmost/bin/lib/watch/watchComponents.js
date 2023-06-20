const chokidar = require('chokidar');
const { resolve, sep, normalize } = require('path');
const { CONSTANTS } = require('@shopmost/shopmost/src/lib/helpers');
const { Componee } = require('@shopmost/shopmost/src/lib/componee/Componee');
const {
  createComponents
} = require('@shopmost/shopmost/bin/lib/createComponents');
const { getRoutes } = require('@shopmost/shopmost/src/lib/router/Router');
const {
  isBuildRequired
} = require('@shopmost/shopmost/src/lib/webpack/isBuildRequired');

function watchComponents() {
  chokidar
    .watch('**/**/pages/*.js', {
      ignored: /node_modules[\\/]/,
      ignoreInitial: true,
      persistent: true
    })
    .on('all', (event, path) => {
      const modulePath = resolve(CONSTANTS.ROOTPATH, path).split(
        normalize('/views/')
      )[0];
      Componee.updateModuleComponents({
        name: modulePath.split(sep).reverse()[0],
        path: modulePath
      });
      const routes = getRoutes();
      createComponents(
        routes.filter((r) => isBuildRequired(r)),
        true
      );
    });
}

module.exports.watchComponents = watchComponents;
