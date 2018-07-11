'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../../lib/settings');

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormattedCurrency = function FormattedCurrency(_ref) {
  var number = _ref.number,
      settings = _ref.settings;
  return helper.formatCurrency(number, settings);
};

var ItemPrice = function ItemPrice(_ref2) {
  var product = _ref2.product,
      settings = _ref2.settings;

  var priceStyle = {};
  if (_settings.themeSettings.list_price_size && _settings.themeSettings.list_price_size > 0) {
    priceStyle.fontSize = _settings.themeSettings.list_price_size + 'px';
  }
  if (_settings.themeSettings.list_price_color && _settings.themeSettings.list_price_color.length > 0) {
    priceStyle.color = _settings.themeSettings.list_price_color;
  }

  if (product.stock_status === 'discontinued') {
    return _react2.default.createElement(
      'div',
      { className: 'product-price' },
      _settings.text.discontinued
    );
  } else if (product.stock_status === 'out_of_stock') {
    return _react2.default.createElement(
      'div',
      { className: 'product-price' },
      _settings.text.outOfStock
    );
  } else if (product.on_sale) {
    return _react2.default.createElement(
      'div',
      { className: 'product-price' },
      _react2.default.createElement(
        'span',
        { className: 'product-new-price' },
        _react2.default.createElement(FormattedCurrency, { settings: settings, number: product.price })
      ),
      _react2.default.createElement(
        'del',
        { className: 'product-old-price' },
        _react2.default.createElement(FormattedCurrency, { settings: settings, number: product.regular_price })
      )
    );
  } else {
    return _react2.default.createElement(
      'div',
      { className: 'product-price', style: priceStyle },
      _react2.default.createElement(FormattedCurrency, { settings: settings, number: product.price })
    );
  }
};

exports.default = ItemPrice;