'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _maxstoreClient = require('maxstore-client');

var _maxstoreClient2 = _interopRequireDefault(_maxstoreClient);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKEN_PAYLOAD = { email: 'store', scopes: ['admin'] };
var STORE_ACCESS_TOKEN = _jsonwebtoken2.default.sign(TOKEN_PAYLOAD, _settings2.default.jwtSecretKey);

var api = new _maxstoreClient2.default({
  apiBaseUrl: _settings2.default.apiBaseUrl,
  ajaxBaseUrl: _settings2.default.ajaxBaseUrl,
  apiToken: STORE_ACCESS_TOKEN
});

exports.default = api;