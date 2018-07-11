'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _text = require('../../text');

var _text2 = _interopRequireDefault(_text);

var _stepContacts = require('../stepContacts');

var _stepContacts2 = _interopRequireDefault(_stepContacts);

var _stepShipping = require('../stepShipping');

var _stepShipping2 = _interopRequireDefault(_stepShipping);

var _stepPayment = require('../stepPayment');

var _stepPayment2 = _interopRequireDefault(_stepPayment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.handleContactsSave = function () {
      _this.setState({
        step: 2
      });
    };

    _this.handleContactsEdit = function () {
      _this.setState({
        step: 1
      });
    };

    _this.handleShippingSave = function () {
      _this.setState({
        step: 3
      });
    };

    _this.handleShippingEdit = function () {
      _this.setState({
        step: 2
      });
    };

    _this.state = {
      step: 1
    };
    return _this;
  }

  _createClass(Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onLoad();
    }
  }, {
    key: 'render',
    value: function render() {
      var step = this.state.step;
      var _props = this.props,
          cart = _props.cart,
          settings = _props.settings,
          themeSettings = _props.themeSettings;
      var _themeSettings$checko = themeSettings.checkoutInputClass,
          checkoutInputClass = _themeSettings$checko === undefined ? 'checkout-field' : _themeSettings$checko,
          _themeSettings$checko2 = themeSettings.checkoutButtonClass,
          checkoutButtonClass = _themeSettings$checko2 === undefined ? 'checkout-button' : _themeSettings$checko2,
          _themeSettings$checko3 = themeSettings.checkoutEditButtonClass,
          checkoutEditButtonClass = _themeSettings$checko3 === undefined ? 'checkout-button-edit' : _themeSettings$checko3;


      if (cart && cart.items.length > 0) {
        var payment_method_gateway = cart.payment_method_gateway;

        var showPaymentForm = payment_method_gateway && payment_method_gateway !== '';

        return _react2.default.createElement(
          'div',
          { className: 'checkout-form' },
          _react2.default.createElement(_stepContacts2.default, {
            show: step >= 1,
            onSave: this.handleContactsSave,
            onEdit: this.handleContactsEdit,
            title: _text2.default.customerDetails,
            inputClassName: checkoutInputClass,
            buttonClassName: checkoutButtonClass,
            editButtonClassName: checkoutEditButtonClass
          }),
          _react2.default.createElement(_stepShipping2.default, {
            show: step >= 2,
            onSave: this.handleShippingSave,
            onEdit: this.handleShippingEdit,
            title: _text2.default.shipping,
            inputClassName: checkoutInputClass,
            buttonClassName: checkoutButtonClass,
            editButtonClassName: checkoutEditButtonClass
          }),
          showPaymentForm && _react2.default.createElement(_stepPayment2.default, {
            show: step === 3,
            title: _text2.default.payment,
            inputClassName: checkoutInputClass,
            buttonClassName: checkoutButtonClass
          })
        );
      } else {
        return _react2.default.createElement(
          'p',
          null,
          _text2.default.emptyCheckout
        );
      }
    }
  }]);

  return Form;
}(_react2.default.Component);

exports.default = Form;