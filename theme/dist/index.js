'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _settings = require('./lib/settings');

Object.defineProperty(exports, 'updateThemeSettings', {
  enumerable: true,
  get: function get() {
    return _settings.updateThemeSettings;
  }
});

var _shared = require('./containers/shared');

Object.defineProperty(exports, 'SharedContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_shared).default;
  }
});

var _index = require('./containers/index');

Object.defineProperty(exports, 'IndexContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

var _category = require('./containers/category');

Object.defineProperty(exports, 'CategoryContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_category).default;
  }
});

var _product = require('./containers/product');

Object.defineProperty(exports, 'ProductContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_product).default;
  }
});

var _notfound = require('./containers/notfound');

Object.defineProperty(exports, 'NotFoundContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_notfound).default;
  }
});

var _page = require('./containers/page');

Object.defineProperty(exports, 'PageContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_page).default;
  }
});

var _checkout = require('./containers/checkout');

Object.defineProperty(exports, 'CheckoutContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_checkout).default;
  }
});

var _checkoutSuccess = require('./containers/checkoutSuccess');

Object.defineProperty(exports, 'CheckoutSuccessContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_checkoutSuccess).default;
  }
});

var _search = require('./containers/search');

Object.defineProperty(exports, 'SearchContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_search).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// combine all css files into one with webpack. Hack to deal with server side rendering.
if (typeof window !== 'undefined') {
  require('../assets/css/theme.scss');
}