'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IGNORE_PATH = ['/'];

var getRedirect = function getRedirect(req) {
  var absoluteUrl = req.protocol + '://' + req.hostname + req.url;
  var relativeUrl = req.url;
  var relativePath = req.path;

  return _api2.default.redirects.list().then(function (_ref) {
    var status = _ref.status,
        json = _ref.json;

    var items = json;
    if (items && items.length > 0) {
      /*
      1. check absolute url
      2. check relative url
      3. check relative url (without query)
      */
      var redirect = items.find(function (item) {
        return item.from === absoluteUrl || item.from === relativeUrl || item.from === relativePath;
      });
      return redirect;
    }

    return null;
  });
};

var redirectUrlIsValid = function redirectUrlIsValid(url) {
  return url && url.length > 0 && (url.startsWith('/') || url.startsWith('https://') || url.startsWith('http://'));
};

var redirects = function redirects(req, res, next) {
  if (IGNORE_PATH.includes(req.url)) {
    next();
  } else {
    getRedirect(req).then(function (redirect) {
      if (redirect && redirectUrlIsValid(redirect.to)) {
        res.redirect(redirect.status, redirect.to);
      } else {
        next();
      }
    }).catch(function () {
      next();
    });
  }
};

exports.default = redirects;