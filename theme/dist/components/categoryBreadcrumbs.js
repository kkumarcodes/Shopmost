'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../lib/settings');

var _helper = require('../lib/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CategoryBreadcrumbs = function CategoryBreadcrumbs(_ref) {
  var currentCategory = _ref.currentCategory,
      categories = _ref.categories;

  var items = helper.getCategoryBreadcrumbs(currentCategory.id, categories);
  return _react2.default.createElement(
    'nav',
    { className: 'breadcrumb is-small', 'aria-label': 'breadcrumbs' },
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
      items,
      _react2.default.createElement(
        'li',
        { className: 'is-active' },
        _react2.default.createElement(
          'a',
          { href: currentCategory.path, 'aria-current': 'page' },
          currentCategory.name
        )
      )
    )
  );
};

exports.default = CategoryBreadcrumbs;