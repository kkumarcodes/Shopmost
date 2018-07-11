'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRouterDom = require('react-router-dom');

var _reducers = require('../shared/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _analytics = require('../shared/analytics');

var analytics = _interopRequireWildcard(_analytics);

var _app = require('../shared/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = window.__APP_STATE__;
var store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default));

_reactDom2.default.hydrate(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_app2.default, null)
  )
), document.getElementById('app'));

analytics.onPageLoad({ state: initialState });