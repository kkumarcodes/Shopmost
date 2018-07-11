'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sort = function Sort(_ref) {
  var defaultSort = _ref.defaultSort,
      currentSort = _ref.currentSort,
      setSort = _ref.setSort;

  return _react2.default.createElement(
    'div',
    { className: 'columns is-mobile sort' },
    _react2.default.createElement(
      'div',
      { className: 'column is-4 sort-title' },
      _settings.text.sort,
      ':'
    ),
    _react2.default.createElement(
      'div',
      { className: 'column' },
      _react2.default.createElement(
        'span',
        { className: 'select is-fullwidth' },
        _react2.default.createElement(
          'select',
          { onChange: function onChange(e) {
              setSort(e.target.value);
            }, value: currentSort },
          _react2.default.createElement(
            'option',
            { value: defaultSort },
            _settings.text.sortFavorite
          ),
          _react2.default.createElement(
            'option',
            { value: _settings.themeSettings.sortNewest },
            _settings.text.sortNewest
          ),
          _react2.default.createElement(
            'option',
            { value: _settings.themeSettings.sortPriceLow },
            _settings.text.sortPriceLow
          ),
          _react2.default.createElement(
            'option',
            { value: _settings.themeSettings.sortPriceHigh },
            _settings.text.sortPriceHigh
          )
        )
      )
    )
  );
};

exports.default = Sort;