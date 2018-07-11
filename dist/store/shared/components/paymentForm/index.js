'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('../../../client/api');

var _api2 = _interopRequireDefault(_api);

var _PayPalCheckout = require('./PayPalCheckout');

var _PayPalCheckout2 = _interopRequireDefault(_PayPalCheckout);

var _LiqPay = require('./LiqPay');

var _LiqPay2 = _interopRequireDefault(_LiqPay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaymentForm = function (_React$Component) {
  _inherits(PaymentForm, _React$Component);

  function PaymentForm(props) {
    _classCallCheck(this, PaymentForm);

    var _this = _possibleConstructorReturn(this, (PaymentForm.__proto__ || Object.getPrototypeOf(PaymentForm)).call(this, props));

    _this.fetchFormSettings = function () {
      _this.setState({
        loading: true
      });

      _api2.default.ajax.paymentFormSettings.retrieve().then(function (_ref) {
        var status = _ref.status,
            json = _ref.json;

        _this.setState({
          formSettings: json,
          loading: false
        });
      }).catch(function (e) {
        _this.setState({
          formSettings: null,
          loading: false
        });
        console.log(e);
      });
    };

    _this.state = {
      formSettings: null,
      loading: false
    };
    return _this;
  }

  _createClass(PaymentForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchFormSettings();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.gateway !== this.props.gateway || nextProps.amount !== this.props.amount) {
        this.fetchFormSettings();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.gateway !== this.props.gateway || nextProps.amount !== this.props.amount || this.state !== nextState;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          gateway = _props.gateway,
          shopSettings = _props.shopSettings,
          onPayment = _props.onPayment;
      var _state = this.state,
          formSettings = _state.formSettings,
          loading = _state.loading;


      if (loading) {
        return null;
      } else if (formSettings && gateway && gateway !== '') {
        switch (gateway) {
          case 'paypal-checkout':
            return _react2.default.createElement(
              'div',
              { className: 'payment-form' },
              _react2.default.createElement(_PayPalCheckout2.default, { formSettings: formSettings, shopSettings: shopSettings, onPayment: onPayment })
            );
          case 'liqpay':
            return _react2.default.createElement(
              'div',
              { className: 'payment-form' },
              _react2.default.createElement(_LiqPay2.default, { formSettings: formSettings, shopSettings: shopSettings, onPayment: onPayment })
            );
          default:
            return _react2.default.createElement(
              'div',
              null,
              'Payment Gateway ',
              _react2.default.createElement(
                'b',
                null,
                gateway
              ),
              ' not found!'
            );
        }
      } else {
        return null;
      }
    }
  }]);

  return PaymentForm;
}(_react2.default.Component);

exports.default = PaymentForm;