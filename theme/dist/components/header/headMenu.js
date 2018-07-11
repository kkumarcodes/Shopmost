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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadMenuItem = function (_React$Component) {
  _inherits(HeadMenuItem, _React$Component);

  function HeadMenuItem(props) {
    _classCallCheck(this, HeadMenuItem);

    var _this = _possibleConstructorReturn(this, (HeadMenuItem.__proto__ || Object.getPrototypeOf(HeadMenuItem)).call(this, props));

    _this.onMouseEnterHandler = function () {
      if (!_this.props.isMobile && _this.props.level === 1) {
        _this.setState({
          isActive: true
        });
      }
    };

    _this.onMouseLeaveHandler = function () {
      if (!_this.props.isMobile && _this.props.level === 1) {
        _this.setState({
          isActive: false
        });
      }
    };

    _this.isActiveToggle = function () {
      return _this.setState({
        isActive: !_this.state.isActive
      });
    };

    _this.state = {
      isActive: false
    };
    return _this;
  }

  _createClass(HeadMenuItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          categories = _props.categories,
          category = _props.category,
          onClick = _props.onClick,
          level = _props.level,
          isMobile = _props.isMobile;

      var items = categories.filter(function (item) {
        return item.parent_id === category.id;
      }).map(function (subcategory, index) {
        return _react2.default.createElement(HeadMenuItem, { key: index, category: subcategory, onClick: onClick, categories: categories, level: level + 1, isMobile: isMobile });
      });
      var hasItems = items.length > 0;

      return _react2.default.createElement(
        'li',
        {
          onMouseEnter: this.onMouseEnterHandler,
          onMouseLeave: this.onMouseLeaveHandler,
          onMouseUp: this.onMouseLeaveHandler,
          className: (level === 2 ? 'column is-3' : '') + (this.state.isActive ? ' is-active' : '') + (hasItems ? ' has-items' : '') },
        _react2.default.createElement(
          'div',
          { className: 'cat-parent' },
          _react2.default.createElement(
            _reactRouterDom.NavLink,
            { activeClassName: 'is-active', className: hasItems ? 'has-items' : '', to: category.path, onClick: onClick },
            category.name
          ),
          hasItems && isMobile && _react2.default.createElement('span', { onClick: this.isActiveToggle })
        ),
        hasItems && _react2.default.createElement(
          'ul',
          { className: (level === 1 ? 'columns is-gapless is-multiline' : '') + ' nav-level-' + level },
          items
        )
      );
    }
  }]);

  return HeadMenuItem;
}(_react2.default.Component);

var HeadMenu = function (_React$PureComponent) {
  _inherits(HeadMenu, _React$PureComponent);

  function HeadMenu() {
    _classCallCheck(this, HeadMenu);

    return _possibleConstructorReturn(this, (HeadMenu.__proto__ || Object.getPrototypeOf(HeadMenu)).apply(this, arguments));
  }

  _createClass(HeadMenu, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          categories = _props2.categories,
          onClick = _props2.onClick,
          isMobile = _props2.isMobile;

      var addItemsToMenu = [];
      if (_settings.themeSettings.header_menu && _settings.themeSettings.header_menu.length > 0) {
        addItemsToMenu = _settings.themeSettings.header_menu.map(function (item) {
          return { name: item.text, path: item.url, id: item.id || '', parent_id: item.parent_id || null };
        });
      }
      var menuItems = [].concat(_toConsumableArray(categories), _toConsumableArray(addItemsToMenu));

      var items = menuItems.filter(function (category) {
        return category.parent_id === null;
      }).map(function (category, index) {
        return _react2.default.createElement(HeadMenuItem, { key: index, category: category, onClick: onClick, categories: categories, level: 1, isMobile: isMobile });
      });

      return _react2.default.createElement(
        'ul',
        { className: 'nav-level-0' },
        items
      );
    }
  }]);

  return HeadMenu;
}(_react2.default.PureComponent);

exports.default = HeadMenu;