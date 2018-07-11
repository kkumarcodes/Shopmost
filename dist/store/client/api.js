'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maxstoreClient = require('maxstore-client');

var _maxstoreClient2 = _interopRequireDefault(_maxstoreClient);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = new _maxstoreClient2.default({
  ajaxBaseUrl: _settings2.default.ajaxBaseUrl || '/ajax'
});

exports.default = api;