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

var textareaField = function textareaField(field) {
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
    _react2.default.createElement('textarea', _extends({}, field.input, { placeholder: field.placeholder, rows: field.rows, id: field.id, className: field.meta.touched && field.meta.error ? "invalid" : "" }))
  );
};

var getFieldLabelByKey = function getFieldLabelByKey(key) {
  switch (key) {
    case 'full_name':
      return _text2.default.fullName;
    case 'address1':
      return _text2.default.address1;
    case 'address2':
      return _text2.default.address2;
    case 'postal_code':
      return _text2.default.postal_code;
    case 'phone':
      return _text2.default.phone;
    case 'company':
      return _text2.default.company;
    default:
      return '';
  }
};

var getFieldLabel = function getFieldLabel(field) {
  var label = field.label && field.label.length > 0 ? field.label : getFieldLabelByKey(field.key);
  return field.required === true ? label : label + ' (' + _text2.default.optional + ')';
};

var CheckoutStepShipping = function (_React$Component) {
  _inherits(CheckoutStepShipping, _React$Component);

  function CheckoutStepShipping(props) {
    _classCallCheck(this, CheckoutStepShipping);

    var _this = _possibleConstructorReturn(this, (CheckoutStepShipping.__proto__ || Object.getPrototypeOf(CheckoutStepShipping)).call(this, props));

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

    _this.onChangeBillingAsShipping = function (event) {
      _this.setState({
        billingAsShipping: event.target.checked
      });
    };

    _this.state = {
      done: false
    };
    return _this;
  }

  _createClass(CheckoutStepShipping, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.show !== nextProps.show) {
        this.setState({
          done: !nextProps.show
        });
      }
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
          processingCheckout = _props.processingCheckout,
          initialValues = _props.initialValues,
          shippingMethod = _props.shippingMethod,
          checkoutFields = _props.checkoutFields,
          settings = _props.settings,
          finishCheckout = _props.finishCheckout,
          inputClassName = _props.inputClassName,
          buttonClassName = _props.buttonClassName,
          editButtonClassName = _props.editButtonClassName;


      var hideBillingAddress = settings.hide_billing_address === true;
      var payment_method_gateway = initialValues.payment_method_gateway,
          grand_total = initialValues.grand_total;

      var showPaymentForm = payment_method_gateway && payment_method_gateway !== '';

      var commentsField = checkoutFields.find(function (f) {
        return f.name === 'comments';
      });
      var commentsFieldPlaceholder = commentsField && commentsField.placeholder && commentsField.placeholder.length > 0 ? commentsField.placeholder : '';
      var commentsFieldLabel = commentsField && commentsField.label && commentsField.label.length > 0 ? commentsField.label : _text2.default.comments;
      var commentsFieldStatus = commentsField && commentsField.status.length > 0 ? commentsField.status : null;
      var commentsValidate = commentsFieldStatus === 'required' ? validateRequired : null;
      var hideCommentsField = commentsFieldStatus === 'hidden';

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
              '2'
            ),
            this.props.title
          )
        );
      } else if (this.state.done) {

        var shippingFields = null;
        if (shippingMethod && shippingMethod.fields && shippingMethod.fields.length > 0) {
          shippingFields = shippingMethod.fields.map(function (field, index) {
            var fieldLabel = getFieldLabel(field);
            var fieldValue = initialValues.shipping_address[field.key];

            return _react2.default.createElement(
              'div',
              { key: index, className: 'checkout-field-preview' },
              _react2.default.createElement(
                'div',
                { className: 'name' },
                fieldLabel
              ),
              _react2.default.createElement(
                'div',
                { className: 'value' },
                fieldValue
              )
            );
          });
        }

        return _react2.default.createElement(
          'div',
          { className: 'checkout-step' },
          _react2.default.createElement(
            'h1',
            null,
            _react2.default.createElement(
              'span',
              null,
              '2'
            ),
            this.props.title
          ),
          shippingFields,
          !hideCommentsField && initialValues.comments !== '' && _react2.default.createElement(
            'div',
            { className: 'checkout-field-preview' },
            _react2.default.createElement(
              'div',
              { className: 'name' },
              commentsFieldLabel
            ),
            _react2.default.createElement(
              'div',
              { className: 'value' },
              initialValues.comments
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

        var _shippingFields = null;
        if (shippingMethod && shippingMethod.fields && shippingMethod.fields.length > 0) {
          _shippingFields = shippingMethod.fields.map(function (field, index) {
            var fieldLabel = getFieldLabel(field);
            var fieldId = 'shipping_address.' + field.key;
            var fieldClassName = inputClassName + ' shipping-' + field.key;
            var validate = field.required === true ? validateRequired : null;

            return _react2.default.createElement(_reduxForm.Field, {
              key: index,
              className: fieldClassName,
              name: fieldId,
              id: fieldId,
              component: inputField,
              type: 'text',
              label: fieldLabel,
              validate: validate
            });
          });
        }

        return _react2.default.createElement(
          'div',
          { className: 'checkout-step' },
          _react2.default.createElement(
            'h1',
            null,
            _react2.default.createElement(
              'span',
              null,
              '2'
            ),
            this.props.title
          ),
          _react2.default.createElement(
            'form',
            { onSubmit: handleSubmit },
            _shippingFields,
            !hideCommentsField && _react2.default.createElement(_reduxForm.Field, {
              className: inputClassName + ' shipping-comments',
              name: 'comments',
              id: 'customer.comments',
              component: textareaField,
              type: 'text',
              label: commentsFieldLabel,
              placeholder: commentsFieldPlaceholder,
              validate: commentsValidate,
              rows: '3'
            }),
            !hideBillingAddress && _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h2',
                null,
                _text2.default.billingAddress
              ),
              _react2.default.createElement(
                'div',
                { className: 'billing-as-shipping' },
                _react2.default.createElement('input', { id: 'billingAsShipping', type: 'checkbox', onChange: this.onChangeBillingAsShipping, checked: this.state.billingAsShipping }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'billingAsShipping' },
                  _text2.default.sameAsShipping
                )
              ),
              !this.state.billingAsShipping && _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_reduxForm.Field, { className: inputClassName + ' billing-fullname', name: 'billing_address.full_name', id: 'billing_address.full_name', component: inputField, type: 'text', label: _text2.default.fullName, validate: [validateRequired] }),
                _react2.default.createElement(_reduxForm.Field, { className: inputClassName + ' billing-address1', name: 'billing_address.address1', id: 'billing_address.address1', component: inputField, type: 'text', label: _text2.default.address1, validate: [validateRequired] }),
                _react2.default.createElement(_reduxForm.Field, { className: inputClassName + ' billing-address2', name: 'billing_address.address2', id: 'billing_address.address2', component: inputField, type: 'text', label: _text2.default.address2 + (' (' + _text2.default.optional + ')') }),
                _react2.default.createElement(_reduxForm.Field, { className: inputClassName + ' billing-postalcode', name: 'billing_address.postal_code', id: 'billing_address.postal_code', component: inputField, type: 'text', label: _text2.default.postal_code + (' (' + _text2.default.optional + ')') }),
                _react2.default.createElement(_reduxForm.Field, { className: inputClassName + ' billing-phone', name: 'billing_address.phone', id: 'billing_address.phone', component: inputField, type: 'text', label: _text2.default.phone + (' (' + _text2.default.optional + ')') }),
                _react2.default.createElement(_reduxForm.Field, { className: inputClassName + ' billing-company', name: 'billing_address.company', id: 'billing_address.company', component: inputField, type: 'text', label: _text2.default.company + (' (' + _text2.default.optional + ')') })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'checkout-button-wrap' },
              showPaymentForm && _react2.default.createElement(
                'button',
                {
                  type: 'button',
                  onClick: handleSubmit(function (data) {
                    _this2.handleSave();
                  }),
                  disabled: invalid,
                  className: buttonClassName },
                _text2.default.next
              ),
              !showPaymentForm && _react2.default.createElement(
                'button',
                {
                  type: 'button',
                  onClick: handleSubmit(function (data) {
                    finishCheckout(data);
                  }),
                  disabled: submitting || processingCheckout || invalid,
                  className: buttonClassName },
                _text2.default.orderSubmit
              )
            )
          )
        );
      }
    }
  }]);

  return CheckoutStepShipping;
}(_react2.default.Component);

exports.default = (0, _reduxForm.reduxForm)({ form: 'CheckoutStepShipping', enableReinitialize: true, keepDirtyOnReinitialize: false })(CheckoutStepShipping);