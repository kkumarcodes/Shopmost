'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _text = require('../../text');

var _text2 = _interopRequireDefault(_text);

var _helper = require('../../lib/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validateRequired = function validateRequired(value) {
  return value && value.length > 0 ? undefined : _text2.default.required;
};

var validateEmail = function validateEmail(value) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? _text2.default.emailInvalid : undefined;
};

var inputField = function inputField(field) {
  return _react2.default.createElement(
    'div',
    { className: field.className },
    _react2.default.createElement(
      'label',
      { htmlFor: field.id },
      field.label,
      field.meta.touched && field.meta.error && _react2.default.createElement(
        'span',
        { className: 'error' },
        field.meta.error
      )
    ),
    _react2.default.createElement('input', _extends({}, field.input, { placeholder: field.placeholder, type: field.type, id: field.id, className: field.meta.touched && field.meta.error ? "invalid" : "" }))
  );
};

var CheckoutStepContacts = function (_React$Component) {
  _inherits(CheckoutStepContacts, _React$Component);

  function CheckoutStepContacts(props) {
    _classCallCheck(this, CheckoutStepContacts);

    var _this = _possibleConstructorReturn(this, (CheckoutStepContacts.__proto__ || Object.getPrototypeOf(CheckoutStepContacts)).call(this, props));

    _this.handleSave = function () {
      _this.setState({
        done: true
      });
      _this.props.saveForm();
      _this.props.onSave();
    };

    _this.handleEdit = function () {
      _this.setState({
        done: false
      });
      _this.props.onEdit();
    };

    _this.getField = function (fieldName) {
      var fields = _this.props.checkoutFields || [];
      var field = fields.find(function (item) {
        return item.name === fieldName;
      });
      return field;
    };

    _this.getFieldStatus = function (fieldName) {
      var field = _this.getField(fieldName);
      return field && field.status ? field.status : 'required';
    };

    _this.isFieldOptional = function (fieldName) {
      return _this.getFieldStatus(fieldName) === 'optional';
    };

    _this.isFieldHidden = function (fieldName) {
      return _this.getFieldStatus(fieldName) === 'hidden';
    };

    _this.getFieldValidators = function (fieldName) {
      var isOptional = _this.isFieldOptional(fieldName);
      var validatorsArray = [];
      if (!isOptional) {
        validatorsArray.push(validateRequired);
      }
      if (fieldName === 'email') {
        validatorsArray.push(validateEmail);
      }

      return validatorsArray;
    };

    _this.getFieldPlaceholder = function (fieldName) {
      var field = _this.getField(fieldName);
      return field && field.placeholder && field.placeholder.length > 0 ? field.placeholder : '';
    };

    _this.getFieldLabelText = function (fieldName) {
      var field = _this.getField(fieldName);
      if (field && field.label && field.label.length > 0) {
        return field.label;
      } else {
        switch (fieldName) {
          case 'email':
            return _text2.default.email;
            break;
          case 'mobile':
            return _text2.default.mobile;
            break;
          case 'country':
            return _text2.default.country;
            break;
          case 'state':
            return _text2.default.state;
            break;
          case 'city':
            return _text2.default.city;
            break;
          default:
            return 'Unnamed field';
        }
      }
    };

    _this.getFieldLabel = function (fieldName) {
      var labelText = _this.getFieldLabelText(fieldName);
      return _this.isFieldOptional(fieldName) ? labelText + ' (' + _text2.default.optional + ')' : labelText;
    };

    _this.state = {
      done: false
    };
    return _this;
  }

  _createClass(CheckoutStepContacts, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onLoad();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          handleSubmit = _props.handleSubmit,
          pristine = _props.pristine,
          invalid = _props.invalid,
          valid = _props.valid,
          reset = _props.reset,
          submitting = _props.submitting,
          loadingShippingMethods = _props.loadingShippingMethods,
          loadingPaymentMethods = _props.loadingPaymentMethods,
          initialValues = _props.initialValues,
          settings = _props.settings,
          saveShippingCountry = _props.saveShippingCountry,
          saveShippingState = _props.saveShippingState,
          saveShippingCity = _props.saveShippingCity,
          saveShippingMethod = _props.saveShippingMethod,
          savePaymentMethod = _props.savePaymentMethod,
          paymentMethods = _props.paymentMethods,
          shippingMethods = _props.shippingMethods,
          inputClassName = _props.inputClassName,
          buttonClassName = _props.buttonClassName,
          editButtonClassName = _props.editButtonClassName;


      if (this.state.done) {
        return _react2.default.createElement(
          'div',
          { className: 'checkout-step' },
          _react2.default.createElement(
            'h1',
            null,
            _react2.default.createElement(
              'span',
              null,
              '1'
            ),
            this.props.title
          ),
          !this.isFieldHidden('email') && _react2.default.createElement(
            'div',
            { className: 'checkout-field-preview' },
            _react2.default.createElement(
              'div',
              { className: 'name' },
              _text2.default.email
            ),
            _react2.default.createElement(
              'div',
              { className: 'value' },
              initialValues.email
            )
          ),
          !this.isFieldHidden('mobile') && _react2.default.createElement(
            'div',
            { className: 'checkout-field-preview' },
            _react2.default.createElement(
              'div',
              { className: 'name' },
              _text2.default.mobile
            ),
            _react2.default.createElement(
              'div',
              { className: 'value' },
              initialValues.mobile
            )
          ),
          !this.isFieldHidden('country') && _react2.default.createElement(
            'div',
            { className: 'checkout-field-preview' },
            _react2.default.createElement(
              'div',
              { className: 'name' },
              _text2.default.country
            ),
            _react2.default.createElement(
              'div',
              { className: 'value' },
              initialValues.shipping_address.country
            )
          ),
          !this.isFieldHidden('state') && _react2.default.createElement(
            'div',
            { className: 'checkout-field-preview' },
            _react2.default.createElement(
              'div',
              { className: 'name' },
              _text2.default.state
            ),
            _react2.default.createElement(
              'div',
              { className: 'value' },
              initialValues.shipping_address.state
            )
          ),
          !this.isFieldHidden('city') && _react2.default.createElement(
            'div',
            { className: 'checkout-field-preview' },
            _react2.default.createElement(
              'div',
              { className: 'name' },
              _text2.default.city
            ),
            _react2.default.createElement(
              'div',
              { className: 'value' },
              initialValues.shipping_address.city
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'checkout-field-preview' },
            _react2.default.createElement(
              'div',
              { className: 'name' },
              _text2.default.shippingMethod
            ),
            _react2.default.createElement(
              'div',
              { className: 'value' },
              initialValues.shipping_method
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'checkout-field-preview' },
            _react2.default.createElement(
              'div',
              { className: 'name' },
              _text2.default.paymentMethod
            ),
            _react2.default.createElement(
              'div',
              { className: 'value' },
              initialValues.payment_method
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'checkout-button-wrap' },
            _react2.default.createElement(
              'button',
              {
                type: 'button',
                onClick: this.handleEdit,
                className: editButtonClassName },
              _text2.default.edit
            )
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
              '1'
            ),
            this.props.title
          ),
          _react2.default.createElement(
            'form',
            { onSubmit: handleSubmit },
            !this.isFieldHidden('email') && _react2.default.createElement(_reduxForm.Field, { className: inputClassName, name: 'email', id: 'customer.email', component: inputField, type: 'email',
              label: this.getFieldLabel('email'),
              validate: this.getFieldValidators('email'),
              placeholder: this.getFieldPlaceholder('email') }),
            !this.isFieldHidden('mobile') && _react2.default.createElement(_reduxForm.Field, { className: inputClassName, name: 'mobile', id: 'customer.mobile', component: inputField, type: 'tel',
              label: this.getFieldLabel('mobile'),
              validate: this.getFieldValidators('mobile'),
              placeholder: this.getFieldPlaceholder('mobile') }),
            _react2.default.createElement(
              'h2',
              null,
              _text2.default.shippingTo
            ),
            !this.isFieldHidden('country') && _react2.default.createElement(_reduxForm.Field, { className: inputClassName, name: 'shipping_address.country', id: 'shipping_address.country', component: inputField, type: 'text',
              label: this.getFieldLabel('country'),
              validate: this.getFieldValidators('country'),
              placeholder: this.getFieldPlaceholder('country'),
              onBlur: function onBlur(event, value) {
                return setTimeout(function () {
                  return saveShippingCountry(value);
                });
              } }),
            !this.isFieldHidden('state') && _react2.default.createElement(_reduxForm.Field, { className: inputClassName, name: 'shipping_address.state', id: 'shipping_address.state', component: inputField, type: 'text',
              label: this.getFieldLabel('state'),
              validate: this.getFieldValidators('state'),
              placeholder: this.getFieldPlaceholder('state'),
              onBlur: function onBlur(event, value) {
                return setTimeout(function () {
                  return saveShippingState(value);
                });
              } }),
            !this.isFieldHidden('city') && _react2.default.createElement(_reduxForm.Field, { className: inputClassName, name: 'shipping_address.city', id: 'shipping_address.city', component: inputField, type: 'text',
              label: this.getFieldLabel('city'),
              validate: this.getFieldValidators('city'),
              placeholder: this.getFieldPlaceholder('city'),
              onBlur: function onBlur(event, value) {
                return setTimeout(function () {
                  return saveShippingCity(value);
                });
              } }),
            _react2.default.createElement(
              'h2',
              null,
              _text2.default.shippingMethods,
              ' ',
              loadingShippingMethods && _react2.default.createElement(
                'small',
                null,
                _text2.default.loading
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'shipping-methods' },
              shippingMethods.map(function (method, index) {
                return _react2.default.createElement(
                  'label',
                  { key: index, className: 'shipping-method' + (method.id === initialValues.shipping_method_id ? ' active' : '') },
                  _react2.default.createElement(_reduxForm.Field, {
                    name: 'shipping_method_id',
                    component: 'input',
                    type: 'radio',
                    value: method.id,
                    onClick: function onClick() {
                      return saveShippingMethod(method.id);
                    }
                  }),
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'shipping-method-name' },
                      method.name
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'shipping-method-description' },
                      method.description
                    )
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'shipping-method-rate' },
                    (0, _helper.formatCurrency)(method.price, settings)
                  )
                );
              })
            ),
            _react2.default.createElement(
              'h2',
              null,
              _text2.default.paymentMethods,
              ' ',
              loadingPaymentMethods && _react2.default.createElement(
                'small',
                null,
                _text2.default.loading
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'payment-methods' },
              paymentMethods.map(function (method, index) {
                return _react2.default.createElement(
                  'label',
                  { key: index, className: 'payment-method' + (method.id === initialValues.payment_method_id ? ' active' : '') },
                  _react2.default.createElement(_reduxForm.Field, {
                    name: 'payment_method_id',
                    validate: [validateRequired],
                    component: 'input',
                    type: 'radio',
                    value: method.id,
                    onClick: function onClick() {
                      return savePaymentMethod(method.id);
                    }
                  }),
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'payment-method-name' },
                      method.name
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'payment-method-description' },
                      method.description
                    )
                  ),
                  _react2.default.createElement('span', { className: 'payment-method-logo' })
                );
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'checkout-button-wrap' },
              _react2.default.createElement(
                'button',
                {
                  type: 'button',
                  onClick: handleSubmit(function (data) {
                    _this2.handleSave();
                  }),
                  disabled: invalid,
                  className: buttonClassName },
                _text2.default.next
              )
            )
          )
        );
      }
    }
  }]);

  return CheckoutStepContacts;
}(_react2.default.Component);

exports.default = (0, _reduxForm.reduxForm)({ form: 'CheckoutStepContacts', enableReinitialize: true, keepDirtyOnReinitialize: true })(CheckoutStepContacts);