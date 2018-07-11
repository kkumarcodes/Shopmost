'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROBOTS_TEMPLATE_PATH = 'public/robots.template';

var robotsRendering = function robotsRendering(req, res) {
  _api2.default.settings.retrieve().then(function (settingsResponse) {
    _fs2.default.readFile(_path2.default.resolve(ROBOTS_TEMPLATE_PATH), 'utf8', function (err, data) {
      if (err) {
        res.status(500).end();
      } else {
        var robots = data.replace(/{domain}/g, settingsResponse.json.domain);
        res.header('Content-Type', 'text/plain');
        res.send(robots);
      }
    });
  });
};

exports.default = robotsRendering;