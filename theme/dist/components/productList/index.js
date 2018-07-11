'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../../lib/settings');

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _loadMore = require('./loadMore');

var _loadMore2 = _interopRequireDefault(_loadMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fragment = _react2.default.Fragment;

var ProductList = function ProductList(_ref) {
  var products = _ref.products,
      addCartItem = _ref.addCartItem,
      settings = _ref.settings,
      loadMoreProducts = _ref.loadMoreProducts,
      hasMore = _ref.hasMore,
      loadingProducts = _ref.loadingProducts,
      loadingMoreProducts = _ref.loadingMoreProducts,
      isCentered = _ref.isCentered,
      className = _ref.className,
      columnCountOnMobile = _ref.columnCountOnMobile,
      columnCountOnTablet = _ref.columnCountOnTablet,
      columnCountOnDesktop = _ref.columnCountOnDesktop,
      columnCountOnWidescreen = _ref.columnCountOnWidescreen,
      columnCountOnFullhd = _ref.columnCountOnFullhd;

  if (!className || className === '') {
    className = 'columns is-multiline is-mobile products';
  }

  var items = products ? products.map(function (product, index) {
    return _react2.default.createElement(_item2.default, {
      key: index,
      product: product,
      addCartItem: addCartItem,
      settings: settings,
      columnCountOnMobile: columnCountOnMobile,
      columnCountOnTablet: columnCountOnTablet,
      columnCountOnDesktop: columnCountOnDesktop,
      columnCountOnWidescreen: columnCountOnWidescreen,
      columnCountOnFullhd: columnCountOnFullhd
    });
  }) : null;

  return _react2.default.createElement(
    Fragment,
    null,
    _react2.default.createElement(
      'div',
      { className: className + (loadingProducts ? ' loading' : '') + (isCentered ? ' is-centered' : '') },
      items
    ),
    _react2.default.createElement(
      'div',
      { className: 'load-more' },
      _react2.default.createElement(_loadMore2.default, { loadMoreProducts: loadMoreProducts, hasMore: hasMore, loading: loadingMoreProducts })
    )
  );
};

exports.default = ProductList;