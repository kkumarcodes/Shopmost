'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../lib/settings');

var _metaTags = require('../components/metaTags');

var _metaTags2 = _interopRequireDefault(_metaTags);

var _orderSummary = require('../components/orderSummary');

var _orderSummary2 = _interopRequireDefault(_orderSummary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fragment = _react2.default.Fragment;

var CheckoutContainer = function CheckoutContainer(props) {
  var pageDetails = props.state.pageDetails;
  var checkoutForm = props.checkoutForm;


  return _react2.default.createElement(
    Fragment,
    null,
    _react2.default.createElement(_metaTags2.default, {
      title: pageDetails.meta_title,
      description: pageDetails.meta_description,
      canonicalUrl: pageDetails.url,
      ogTitle: pageDetails.meta_title,
      ogDescription: pageDetails.meta_description
    }),
    _react2.default.createElement(
      'section',
      { className: 'section section-checkout' },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'columns columns-checkout' },
          _react2.default.createElement(
            'div',
            { className: 'column is-5-widescreen is-offset-1-widescreen is-6-desktop' },
            _react2.default.createElement(_orderSummary2.default, props)
          ),
          _react2.default.createElement(
            'div',
            { className: 'column is-6-widescreen is-6-desktop' },
            checkoutForm
          )
        )
      )
    )
  );
};

exports.default = CheckoutContainer;