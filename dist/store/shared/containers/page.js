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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(_containerProps.mapStateToProps, _containerProps.mapDispatchToProps)(_theme.PageContainer));