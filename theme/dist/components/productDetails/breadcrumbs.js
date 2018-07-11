'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../../lib/settings');

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductBreadcrumbs = function ProductBreadcrumbs(_ref) {
  var product = _ref.product,
      categories = _ref.categories;

  var items = helper.getProductBreadcrumbs(product, categories);
  return _react2.default.createElement(
    'nav',
    { className: 'breadcrumb is-small product-breadcrumb', 'aria-label': 'breadcrumbs' },
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: '/' },
          _settings.text.home
        )
      ),
      items
    )
  );
};

exports.default = ProductBreadcrumbs;