'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _text = require('../../text');

var _text2 = _interopRequireDefault(_text);

var _helper = require('../../lib/helper');

var _paymentForm = require('../paymentForm');

var _paymentForm2 = _interopRequireDefault(_paymentForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckoutStepPayment = function (_React$Component) {
  _inherits(CheckoutStepPayment, _React$Component);

  function CheckoutStepPayment() {
    _classCallCheck(this, CheckoutStepPayment);

    return _possibleConstructorReturn(this, (CheckoutStepPayment.__proto__ || Object.getPrototypeOf(CheckoutStepPayment)).apply(this, arguments));
  }

  _createClass(CheckoutStepPayment, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          cart = _props.cart,
          settings = _props.settings,
          processingCheckout = _props.processingCheckout,
          finishCheckout = _props.finishCheckout,
          inputClassName = _props.inputClassName,
          buttonClassName = _props.buttonClassName;
      var payment_method_gateway = cart.payment_method_gateway,
          grand_total = cart.grand_total;


      if (!this.props.show) {
        return _react2.default.createElement(
          'div',
          { className: 'checkout-step' },
          _react2.default.createElement(
            'h1',
            null,
            _react2.default.createElement(
              'span',
              null,
              '3'
            ),
            this.props.title
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'checkout-step' },
          _react2.default.createElement(
            'h1',
            null,
            _react2.default.createElement(
              'span',
              null,
              '3'
            ),
            this.props.title
          ),
          _react2.default.createElement(
            'div',
            { className: 'checkout-button-wrap' },
            !processingCheckout && _react2.default.createElement(_paymentForm2.default, {
              gateway: payment_method_gateway,
              amount: grand_total,
              shopSettings: settings,
              onPayment: finishCheckout,
              inputClassName: inputClassName,
              buttonClassName: buttonClassName
            }),
            processingCheckout && _react2.default.createElement(
              'p',
              null,
              _text2.default.loading
            )
          )
        );
      }
    }
  }]);

  return CheckoutStepPayment;
}(_react2.default.Component);

exports.default = CheckoutStepPayment;