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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scriptAdded = false;

var PayPalButton = function (_React$Component) {
  _inherits(PayPalButton, _React$Component);

  function PayPalButton(props) {
    _classCallCheck(this, PayPalButton);

    var _this = _possibleConstructorReturn(this, (PayPalButton.__proto__ || Object.getPrototypeOf(PayPalButton)).call(this, props));

    _this.addScript = function () {
      if (scriptAdded) {
        _this.executeScript();
        return;
      }

      var SCRIPT_URL = 'https://www.paypalobjects.com/api/checkout.min.js';
      var container = document.body || document.head;
      var script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.onload = function () {
        _this.executeScript();
      };
      container.appendChild(script);
      scriptAdded = true;
    };

    _this.executeScript = function () {
      var _this$props = _this.props,
          formSettings = _this$props.formSettings,
          shopSettings = _this$props.shopSettings,
          onPayment = _this$props.onPayment;


      document.getElementById('paypal-button-container').innerHTML = null;

      paypal.Button.render({
        // Set your environment
        env: formSettings.env, // sandbox | production
        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,
        // Specify the style of the button
        style: {
          label: 'pay',
          size: formSettings.size,
          shape: formSettings.shape,
          color: formSettings.color
        },
        client: {
          sandbox: formSettings.client,
          production: formSettings.client
        },
        // Wait for the PayPal button to be clicked
        payment: function payment(data, actions) {
          return actions.payment.create({
            payment: {
              intent: 'sale',
              transactions: [{
                custom: formSettings.order_id,
                notify_url: formSettings.notify_url,
                amount: {
                  total: formSettings.amount,
                  currency: formSettings.currency
                }
              }]
            },
            experience: {
              input_fields: { no_shipping: 1 }
            }
          });
        },
        // Wait for the payment to be authorized by the customer
        onAuthorize: function onAuthorize(data, actions) {
          return actions.payment.execute().then(function () {
            onPayment();
          });
        }
      }, '#paypal-button-container');
    };

    return _this;
  }

  _createClass(PayPalButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addScript();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.executeScript();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          formSettings = _props.formSettings,
          shopSettings = _props.shopSettings,
          onPayment = _props.onPayment;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { id: 'paypal-button-container' })
      );
    }
  }]);

  return PayPalButton;
}(_react2.default.Component);

exports.default = PayPalButton;