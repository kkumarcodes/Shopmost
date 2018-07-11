'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maxstoreClient = require('maxstore-client');

var _maxstoreClient2 = _interopRequireDefault(_maxstoreClient);

var _store = require('../../../config/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = new _maxstoreClient2.default({
  ajaxBaseUrl: _store2.default.ajaxBaseUrl || '/ajax'
});

exports.default = api;