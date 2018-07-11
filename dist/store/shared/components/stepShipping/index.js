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
  var shippingMethod = null;
  var shipping_method_id = state.app.cart.shipping_method_id;

  if (shipping_method_id && state.app.shippingMethods && state.app.shippingMethods.length > 0) {
    shippingMethod = state.app.shippingMethods.find(function (method) {
      return method.id === shipping_method_id;
    });
  }

  return {
    shippingMethod: shippingMethod,
    initialValues: state.app.cart,
    settings: state.app.settings,
    checkoutFields: state.app.checkoutFields,
    processingCheckout: state.app.processingCheckout
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: function onSubmit(values) {
      dispatch((0, _actions.updateShipping)(values));
    },
    saveForm: function saveForm(values) {
      dispatch((0, _reduxForm.submit)('CheckoutStepShipping'));
    },
    finishCheckout: function finishCheckout(values) {
      dispatch((0, _actions.checkout)(values, ownProps.history));
    }
  };
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_form2.default));