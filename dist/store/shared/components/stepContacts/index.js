'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reduxForm = require('redux-form');

var _actions = require('../../actions');

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    initialValues: state.app.cart,
    settings: state.app.settings,
    paymentMethods: state.app.paymentMethods,
    shippingMethods: state.app.shippingMethods,
    loadingShippingMethods: state.app.loadingShippingMethods,
    loadingPaymentMethods: state.app.loadingPaymentMethods,
    checkoutFields: state.app.checkoutFields
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: function onSubmit(values) {
      dispatch((0, _actions.updateCart)(values));
      dispatch((0, _actions.analyticsSetShippingMethod)(values.shipping_method_id));
      dispatch((0, _actions.analyticsSetPaymentMethod)(values.payment_method_id));
    },
    saveForm: function saveForm(values) {
      dispatch((0, _reduxForm.submit)('CheckoutStepContacts'));
    },
    saveShippingCountry: function saveShippingCountry(countryName) {
      if (countryName && countryName.length > 0) {
        dispatch((0, _actions.updateCartShippingCountry)(countryName));
      }
    },
    saveShippingState: function saveShippingState(stateName) {
      if (stateName && stateName.length > 0) {
        dispatch((0, _actions.updateCartShippingState)(stateName));
      }
    },
    saveShippingCity: function saveShippingCity(cityName) {
      if (cityName && cityName.length > 0) {
        dispatch((0, _actions.updateCartShippingCity)(cityName));
      }
    },
    saveShippingMethod: function saveShippingMethod(value) {
      dispatch((0, _actions.updateCartShippingMethod)(value));
    },
    savePaymentMethod: function savePaymentMethod(value) {
      dispatch((0, _actions.updateCartPaymentMethod)(value));
    },
    onLoad: function onLoad() {
      dispatch((0, _actions.fetchShippingMethods)());
      dispatch((0, _actions.fetchPaymentMethods)());
    }
  };
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_form2.default));