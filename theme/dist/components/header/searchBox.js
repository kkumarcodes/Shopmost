'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBox = function (_React$Component) {
  _inherits(SearchBox, _React$Component);

  function SearchBox(props) {
    _classCallCheck(this, SearchBox);

    var _this = _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call(this, props));

    _this.handleChange = function (event) {
      _this.setState({ value: event.target.value });
    };

    _this.handleKeyPress = function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        _this.handleSearch();
      }
    };

    _this.handleKeyDown = function (e) {
      if (e.keyCode === 27) {
        _this.handleClear();
      }
    };

    _this.handleSearch = function () {
      _this.props.onSearch(_this.state.value);
    };

    _this.handleClear = function () {
      _this.setState({ value: '' });
      _this.props.onSearch('');
    };

    _this.handleFocus = function () {
      _this.setState({ hasFocus: true });
    };

    _this.handleBlur = function () {
      _this.setState({ hasFocus: false });
    };

    _this.state = {
      value: props.value,
      hasFocus: false
    };
    return _this;
  }

  _createClass(SearchBox, [{
    key: 'render',
    value: function render() {
      var hasFocus = this.state.hasFocus;

      var placeholderText = _settings.themeSettings.search_placeholder && _settings.themeSettings.search_placeholder.length > 0 ? _settings.themeSettings.search_placeholder : _settings.text.searchPlaceholder;

      return _react2.default.createElement(
        'div',
        { className: 'search-box ' + this.props.className + (hasFocus ? ' has-focus' : '') },
        _react2.default.createElement('input', {
          className: 'search-input',
          type: 'text',
          placeholder: placeholderText,
          value: this.state.value,
          onChange: this.handleChange,
          onKeyPress: this.handleKeyPress,
          onKeyDown: this.handleKeyDown,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }),
        _react2.default.createElement('img', { className: 'search-icon-search', src: '/assets/images/search.svg', alt: _settings.text.search, title: _settings.text.search, onClick: this.handleSearch }),
        this.state.value && this.state.value !== '' && _react2.default.createElement('img', { className: 'search-icon-clear', src: '/assets/images/close.svg', onClick: this.handleClear })
      );
    }
  }]);

  return SearchBox;
}(_react2.default.Component);

exports.default = SearchBox;