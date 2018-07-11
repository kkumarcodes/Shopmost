const express = require('express');
const app = express();
const helmet = require('helmet');//help secure express apps with various http headers
const responseTime = require('response-time');//response time for node.js servers
const path = require('path');//node.js path module
const cookieParser = require('cookie-parser');//parse Cookie header and populate req.cookies with an object keyed by the cookie names.
const winston = require('winston');//a logger for just about everything
const settings = require('../../../config/server');
const logger = require('./logger').default;//winston logger
const robotsRendering = require('./robotsRendering').default;
const sitemapRendering = require('./sitemapRendering').default;
const redirects = require('./redirects').default;
const pageRendering = require('./pageRendering').default;

const ADMIN_INDEX_PATH = path.resolve('public/admin/index.html');
const STATIC_OPTIONS = {
  maxAge: 31536000000 // One year
};

app.set('trust proxy', 1);
app.use(helmet());
app.get('/images/:entity/:id/:size/:filename', (req, res, next) => {
  // A stub of image resizing (can be done with Nginx)
  const newUrl = `/images/${req.params.entity}/${req.params.id}/${req.params.filename}`;
  req.url = newUrl;
  next();
});
app.all('*', (req, res, next) => {
  // CORS headers
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization');
  next();
});
app.use(express.static('public/content', STATIC_OPTIONS));
app.use('/assets', express.static('theme/assets', STATIC_OPTIONS));
app.use('/admin-assets', express.static('public/admin-assets', STATIC_OPTIONS));
app.use('/sw.js', express.static('public/sw.js', STATIC_OPTIONS));
app.use('/sw-toolbox.js', express.static('public/sw-toolbox.js', STATIC_OPTIONS));
app.use('/admin', (req, res) => {
  res.sendFile(ADMIN_INDEX_PATH)
});
app.get(/^.+\.(jpg|jpeg|gif|png|bmp|ico|webp|svg|css|js|zip|rar|flv|swf|xls)$/, (req, res) => {
  res.status(404).end();
});
app.get('/robots.txt', robotsRendering)
app.get('/sitemap.xml', sitemapRendering);
app.get('*', redirects);
app.use(responseTime());
app.use(cookieParser(settings.cookieSecretKey));
app.get('*', pageRendering);

const server = app.listen(settings.storeListenPort, () => {
  const serverAddress = server.address();
  winston.info(`Store running at http://localhost:${serverAddress.port}`);
});
