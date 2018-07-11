'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _containerProps = require('../containerProps');

var _theme = require('theme');

var _checkoutForm = require('../components/checkoutForm');

var _checkoutForm2 = _interopRequireDefault(_checkoutForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConnectedCheckoutContainer = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(_containerProps.mapStateToProps, _containerProps.mapDispatchToProps)(_theme.CheckoutContainer));

exports.default = function () {
  return _react2.default.createElement(ConnectedCheckoutContainer, { checkoutForm: _react2.default.createElement(_checkoutForm2.default, null) });
};