'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

var _settings = require('../../lib/settings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = function Option(_ref) {
  var option = _ref.option,
      _onChange = _ref.onChange;

  var values = option.values.sort(function (a, b) {
    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
  }).map(function (value, index) {
    return _react2.default.createElement(
      'option',
      { key: index, value: value.id },
      value.name
    );
  });

  var notSelectedTitle = _settings.text.selectOption + ' ' + option.name;

  return _react2.default.createElement(
    'div',
    { className: 'product-option' },
    _react2.default.createElement(
      'div',
      { className: 'product-option-name' },
      option.name
    ),
    _react2.default.createElement(
      'span',
      { className: 'select is-fullwidth' },
      _react2.default.createElement(
        'select',
        { onChange: function onChange(e) {
            _onChange(option.id, e.target.value);
          } },
        _react2.default.createElement(
          'option',
          { value: '' },
          notSelectedTitle
        ),
        values
      )
    )
  );
};

var Options = function Options(_ref2) {
  var options = _ref2.options,
      onChange = _ref2.onChange;

  if (options && options.length > 0) {
    var items = options.map(function (option, index) {
      return _react2.default.createElement(Option, { key: index, option: option, onChange: onChange });
    });

    return _react2.default.createElement(
      'div',
      { className: 'product-options' },
      items
    );
  } else {
    return null;
  }
};
exports.default = Options;