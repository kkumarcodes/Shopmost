'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _server = require('react-dom/server');

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _theme = require('theme');

var _reducers = require('../shared/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _loadState = require('./loadState');

var _readIndexHtml = require('./readIndexHtml');

var _app = require('../shared/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHead = function getHead() {
  var helmet = _reactHelmet2.default.rewind();
  return {
    title: helmet.title.toString(),
    meta: helmet.meta.toString(),
    link: helmet.link.toString(),
    script: helmet.script.toString(),
    style: helmet.style.toString(),
    htmlAttributes: helmet.htmlAttributes.toString(),
    base: helmet.base.toString(),
    noscript: helmet.noscript.toString()
  };
};

var getReferrerCookieOptions = function getReferrerCookieOptions(isHttps) {
  return {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    signed: true,
    secure: isHttps,
    sameSite: 'strict'
  };
};

var renderError = function renderError(req, res, err) {
  _winston2.default.error('Page error', req.url, err);
  res.status(500).send(err);
};

var getAppHtml = function getAppHtml(store, location) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var html = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouter.StaticRouter,
      { location: location, context: context },
      _react2.default.createElement(_app2.default, null)
    )
  ));

  return html;
};

var getPlaceholder = function getPlaceholder(placeholders) {
  var placeholder = {
    head_start: '',
    head_end: '',
    body_start: '',
    body_end: ''
  };

  if (placeholders && placeholders.length > 0) {
    placeholder.head_start = placeholders.filter(function (p) {
      return p.place === 'head_start';
    }).map(function (p) {
      return p.value;
    }).join('\n');
    placeholder.head_end = placeholders.filter(function (p) {
      return p.place === 'head_end';
    }).map(function (p) {
      return p.value;
    }).join('\n');
    placeholder.body_start = placeholders.filter(function (p) {
      return p.place === 'body_start';
    }).map(function (p) {
      return p.value;
    }).join('\n');
    placeholder.body_end = placeholders.filter(function (p) {
      return p.place === 'body_end';
    }).map(function (p) {
      return p.value;
    }).join('\n');
  }

  return placeholder;
};

var renderPage = function renderPage(req, res, store, themeText, placeholders) {
  var appHtml = getAppHtml(store, req.url);
  var state = store.getState();
  var head = getHead();
  var placeholder = getPlaceholder(placeholders);

  var html = _readIndexHtml.indexHtml.replace('{placeholder_head_start}', placeholder.head_start).replace('{placeholder_head_end}', placeholder.head_end).replace('{placeholder_body_start}', placeholder.body_start).replace('{placeholder_body_end}', placeholder.body_end).replace('{language}', _settings2.default.language).replace('{title}', head.title).replace('{meta}', head.meta).replace('{link}', head.link).replace('{script}', head.script).replace('{app_text}', JSON.stringify(themeText)).replace('{app_state}', JSON.stringify(state)).replace('{app}', appHtml);

  var isHttps = req.protocol === 'https';
  var full_url = req.protocol + '://' + req.hostname + req.url;
  var referrer_url = req.get('referrer') === undefined ? '' : req.get('referrer');
  var REFERRER_COOKIE_OPTIONS = getReferrerCookieOptions(isHttps);

  if (!req.signedCookies.referrer_url) {
    res.cookie('referrer_url', referrer_url, REFERRER_COOKIE_OPTIONS);
  }

  if (!req.signedCookies.landing_url) {
    res.cookie('landing_url', full_url, REFERRER_COOKIE_OPTIONS);
  }

  var httpStatusCode = state.app.currentPage.type === 404 ? 404 : 200;
  res.status(httpStatusCode).send(html);
};

var pageRendering = function pageRendering(req, res) {
  (0, _loadState.loadState)(req, _settings2.default.language).then(function (_ref) {
    var state = _ref.state,
        themeText = _ref.themeText,
        placeholders = _ref.placeholders;

    (0, _theme.updateThemeSettings)({
      settings: state.app.themeSettings,
      text: themeText
    });
    var store = (0, _redux.createStore)(_reducers2.default, state, (0, _redux.applyMiddleware)(_reduxThunk2.default));
    renderPage(req, res, store, themeText, placeholders);
  }).catch(function (err) {
    renderError(req, res, err);
  });
};

exports.default = pageRendering;