'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _sitemap = require('sitemap');

var _sitemap2 = _interopRequireDefault(_sitemap);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SITEMAP_EXCLUDE_PATH = ['/', '/checkout', '/checkout-success', '/account', '/cart', '/login', '/logout', '/register'];

var sitemapRendering = function sitemapRendering(req, res) {
  Promise.all([_api2.default.sitemap.list({ enabled: true }), _api2.default.settings.retrieve()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        sitemapResponse = _ref2[0],
        settingsResponse = _ref2[1];

    var urls = sitemapResponse.json.filter(function (item) {
      return item.type !== 'reserved' && item.type !== 'search' && !SITEMAP_EXCLUDE_PATH.includes(item.path);
    }).map(function (item) {
      return item.path;
    });
    var sitemap = _sitemap2.default.createSitemap({
      hostname: settingsResponse.json.domain,
      urls: urls
    });
    sitemap.toXML(function (err, xml) {
      if (err) {
        res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });
};

exports.default = sitemapRendering;