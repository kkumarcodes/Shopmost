'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexHtml = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FILE_PATH = _path2.default.resolve('theme/assets/index.html');
var indexHtml = exports.indexHtml = null;

_fs2.default.readFile(FILE_PATH, 'utf8', function (err, data) {
  if (err) {
    exports.indexHtml = indexHtml = '';
    _winston2.default.error('Fail to read file', FILE_PATH, err);
  } else {
    exports.indexHtml = indexHtml = data;
  }
});