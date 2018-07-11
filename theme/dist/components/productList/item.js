'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../../lib/settings');

var _itemTags = require('./itemTags');

var _itemTags2 = _interopRequireDefault(_itemTags);

var _itemImage = require('./itemImage');

var _itemImage2 = _interopRequireDefault(_itemImage);

var _itemPrice = require('./itemPrice');

var _itemPrice2 = _interopRequireDefault(_itemPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function Item(_ref) {
  var product = _ref.product,
      addCartItem = _ref.addCartItem,
      settings = _ref.settings,
      columnCountOnMobile = _ref.columnCountOnMobile,
      columnCountOnTablet = _ref.columnCountOnTablet,
      columnCountOnDesktop = _ref.columnCountOnDesktop,
      columnCountOnWidescreen = _ref.columnCountOnWidescreen,
      columnCountOnFullhd = _ref.columnCountOnFullhd;

  columnCountOnMobile = columnCountOnMobile || 2;
  columnCountOnTablet = columnCountOnTablet || 3;
  columnCountOnDesktop = columnCountOnDesktop || 4;
  columnCountOnWidescreen = columnCountOnWidescreen || 4;
  columnCountOnFullhd = columnCountOnFullhd || 4;

  var columnCount = 12;

  var columnSizeOnMobile = columnCount / columnCountOnMobile;
  var columnSizeOnTablet = columnCount / columnCountOnTablet;
  var columnSizeOnDesktop = columnCount / columnCountOnDesktop;
  var columnSizeOnWidescreen = columnCount / columnCountOnWidescreen;
  var columnSizeOnFullhd = columnCount / columnCountOnFullhd;

  var imageHeight = _settings.themeSettings.list_image_max_height && _settings.themeSettings.list_image_max_height > 0 ? _settings.themeSettings.list_image_max_height : 'auto';
  var placeholderHeight = _settings.themeSettings.list_image_max_height && _settings.themeSettings.list_image_max_height > 0 ? _settings.themeSettings.list_image_max_height : 200;

  return _react2.default.createElement(
    'div',
    { className: 'column is-' + columnSizeOnMobile + '-mobile is-' + columnSizeOnTablet + '-tablet is-' + columnSizeOnDesktop + '-desktop is-' + columnSizeOnWidescreen + '-widescreen is-' + columnSizeOnFullhd + '-fullhd ' + product.stock_status },
    _react2.default.createElement(
      _reactRouterDom.NavLink,
      { to: product.path },
      _react2.default.createElement(
        'figure',
        { className: 'image', style: { height: imageHeight } },
        _react2.default.createElement(_itemTags2.default, { tags: product.tags }),
        _react2.default.createElement(_itemImage2.default, { images: product.images, productName: product.name, height: placeholderHeight })
      ),
      _react2.default.createElement(
        'div',
        { className: 'content product-caption' },
        _react2.default.createElement(
          'div',
          { className: 'product-name' },
          product.name
        ),
        _react2.default.createElement(_itemPrice2.default, { product: product, settings: settings })
      )
    )
  );
};

exports.default = Item;