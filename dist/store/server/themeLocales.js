'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getText = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var THEME_LOCALES_PATH = 'theme/locales/';
var text = null;

var getText = exports.getText = function getText(locale) {
  if (text) {
    return Promise.resolve(text);
  } else {
    var filePath = _path2.default.resolve(THEME_LOCALES_PATH + locale + '.json');
    return new Promise(function (resolve, reject) {
      _fs2.default.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
          _winston2.default.error('Fail to read theme locale', filePath, err);
          reject(err);
        } else {
          text = JSON.parse(data);
          resolve(text);
        }
      });
    });
  }
};