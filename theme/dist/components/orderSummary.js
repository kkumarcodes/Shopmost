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

var SummaryItem = function SummaryItem(_ref) {
  var settings = _ref.settings,
      item = _ref.item,
      deleteCartItem = _ref.deleteCartItem,
      updateCartItemQuantiry = _ref.updateCartItemQuantiry;

  var thumbnail = helper.getThumbnailUrl(item.image_url, _settings.themeSettings.cartThumbnailWidth);
  var qtyOptions = [];
  var maxQty = item.stock_backorder ? _settings.themeSettings.maxCartItemQty : item.stock_quantity >= _settings.themeSettings.maxCartItemQty ? _settings.themeSettings.maxCartItemQty : item.stock_quantity;

  for (var i = 0; i <= maxQty; i++) {
    var optionText = i === 0 ? _settings.text.remove : i;
    qtyOptions.push(_react2.default.createElement(
      'option',
      { key: i, value: i },
      optionText
    ));
  }

  return _react2.default.createElement(
    'div',
    { className: 'columns is-mobile' },
    _react2.default.createElement(
      'div',
      { className: 'column is-3' },
      _react2.default.createElement(
        'div',
        { className: 'image' },
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: item.path },
          _react2.default.createElement('img', { className: 'product-image', src: thumbnail, alt: item.name, title: item.name })
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'column' },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: item.path },
          item.name
        )
      ),
      item.variant_name.length > 0 && _react2.default.createElement(
        'div',
        { className: 'cart-option-name' },
        item.variant_name
      ),
      _react2.default.createElement(
        'div',
        { className: 'qty' },
        _react2.default.createElement(
          'span',
          null,
          _settings.text.qty,
          ':'
        ),
        _react2.default.createElement(
          'span',
          { className: 'select is-small' },
          _react2.default.createElement(
            'select',
            { onChange: function onChange(e) {
                updateCartItemQuantiry(item.id, e.target.value);
              }, value: item.quantity },
            qtyOptions
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'column is-3 has-text-right price' },
      helper.formatCurrency(item.price_total, settings)
    )
  );
};

var OrderSummary = function OrderSummary(props) {
  var _props$state = props.state,
      cart = _props$state.cart,
      settings = _props$state.settings;


  if (cart && cart.items && cart.items.length > 0) {
    var items = cart.items.map(function (item) {
      return _react2.default.createElement(SummaryItem, {
        key: item.id,
        item: item,
        deleteCartItem: props.deleteCartItem,
        updateCartItemQuantiry: props.updateCartItemQuantiry,
        settings: settings
      });
    });

    return _react2.default.createElement(
      'div',
      { className: 'checkout-box content is-small', style: { paddingBottom: 0 } },
      _react2.default.createElement(
        'div',
        { className: 'title is-4' },
        _settings.text.orderSummary
      ),
      _react2.default.createElement('hr', { className: 'separator' }),
      items,
      _react2.default.createElement(
        'div',
        { className: 'columns is-mobile is-gapless is-multiline summary-block' },
        _react2.default.createElement(
          'div',
          { className: 'column is-7' },
          _settings.text.subtotal
        ),
        _react2.default.createElement(
          'div',
          { className: 'column is-5 has-text-right price' },
          helper.formatCurrency(cart.subtotal, settings)
        ),
        _react2.default.createElement(
          'div',
          { className: 'column is-7' },
          _settings.text.shipping
        ),
        _react2.default.createElement(
          'div',
          { className: 'column is-5 has-text-right price' },
          helper.formatCurrency(cart.shipping_total, settings)
        ),
        cart.discount_total > 0 && _react2.default.createElement(
          'div',
          { className: 'column is-7' },
          _settings.text.discount
        ),
        cart.discount_total > 0 && _react2.default.createElement(
          'div',
          { className: 'column is-5 has-text-right price' },
          helper.formatCurrency(cart.discount_total, settings)
        ),
        _react2.default.createElement(
          'div',
          { className: 'column is-12' },
          _react2.default.createElement('hr', { className: 'separator' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'column is-6 total-text' },
          _settings.text.grandTotal
        ),
        _react2.default.createElement(
          'div',
          { className: 'column is-6 total-price' },
          helper.formatCurrency(cart.grand_total, settings)
        )
      )
    );
  } else {
    return null;
  }
};

exports.default = OrderSummary;