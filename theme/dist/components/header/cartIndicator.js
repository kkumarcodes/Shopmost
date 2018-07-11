'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CartCount = function CartCount(_ref) {
  var cart = _ref.cart;

  if (cart && cart.items && cart.items.length > 0) {
    var itemsCount = cart.items.reduce(function (a, b) {
      return a + b.quantity;
    }, 0);
    return _react2.default.createElement(
      'span',
      { className: 'cart-count' },
      itemsCount
    );
  } else {
    return null;
  }
};

var CartIcon = function CartIcon(_ref2) {
  var cartIsActive = _ref2.cartIsActive;

  if (cartIsActive) {
    return _react2.default.createElement('img', { src: '/assets/images/close.svg', className: 'icon', alt: _settings.text.close, title: _settings.text.close, style: { minWidth: 24, padding: 4 } });
  } else {
    return _react2.default.createElement('img', { src: '/assets/images/shopping-bag.svg', className: 'icon', alt: _settings.text.cart, title: _settings.text.cart, style: { minWidth: 24 } });
  }
};

var CartIndicator = function (_React$PureComponent) {
  _inherits(CartIndicator, _React$PureComponent);

  function CartIndicator() {
    _classCallCheck(this, CartIndicator);

    return _possibleConstructorReturn(this, (CartIndicator.__proto__ || Object.getPrototypeOf(CartIndicator)).apply(this, arguments));
  }

  _createClass(CartIndicator, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          cart = _props.cart,
          onClick = _props.onClick,
          cartIsActive = _props.cartIsActive;

      return _react2.default.createElement(
        'span',
        { className: 'cart-button', onClick: onClick },
        _react2.default.createElement(CartIcon, { cartIsActive: cartIsActive }),
        _react2.default.createElement(CartCount, { cart: cart })
      );
    }
  }]);

  return CartIndicator;
}(_react2.default.PureComponent);

exports.default = CartIndicator;