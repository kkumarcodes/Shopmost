'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooterMenu = function (_React$Component) {
  _inherits(FooterMenu, _React$Component);

  function FooterMenu(props) {
    _classCallCheck(this, FooterMenu);

    var _this = _possibleConstructorReturn(this, (FooterMenu.__proto__ || Object.getPrototypeOf(FooterMenu)).call(this, props));

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

  _createClass(FooterMenu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          items = _props.items;

      var ulItems = null;

      if (items && items.length > 0) {
        ulItems = items.map(function (item, index) {
          return _react2.default.createElement(
            'li',
            { key: index },
            _react2.default.createElement(
              _reactRouterDom.NavLink,
              { to: item.url || '' },
              item.text
            )
          );
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'column is-3' },
        _react2.default.createElement(
          'div',
          { className: 'footer-title mobile-padding' + (this.state.isActive ? ' footer-menu-open' : ''), onClick: this.isActiveToggle },
          title,
          _react2.default.createElement('span', null)
        ),
        _react2.default.createElement(
          'ul',
          { className: 'footer-menu' },
          ulItems
        )
      );
    }
  }]);

  return FooterMenu;
}(_react2.default.Component);

var SocialIcons = function SocialIcons(_ref) {
  var icons = _ref.icons;

  if (icons && icons.length > 0) {
    var items = icons.map(function (icon, index) {
      return _react2.default.createElement('a', { key: index, href: icon.url || '', target: '_blank', rel: 'noopener', title: icon.type, className: icon.type });
    });
    return _react2.default.createElement(
      'p',
      { className: 'social-icons' },
      items
    );
  } else {
    return null;
  }
};

var Contacts = function Contacts(_ref2) {
  var contacts = _ref2.contacts;

  if (contacts && contacts.length > 0) {
    var items = contacts.map(function (item, index) {
      var contact = item ? item.text : null;
      if (contact && contact.indexOf('@') > 0) {
        return _react2.default.createElement(
          'li',
          { key: index },
          _react2.default.createElement(
            'a',
            { href: 'mailto:' + contact },
            contact
          )
        );
      } else {
        return _react2.default.createElement(
          'li',
          { key: index },
          contact
        );
      }
    });
    return _react2.default.createElement(
      'ul',
      { className: 'footer-contacts' },
      items
    );
  } else {
    return null;
  }
};

var Footer = function (_React$PureComponent) {
  _inherits(Footer, _React$PureComponent);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      var settings = this.props.settings;

      var footerLogoUrl = _settings.themeSettings.footer_logo_url && _settings.themeSettings.footer_logo_url.length > 0 ? '/assets/images/' + _settings.themeSettings.footer_logo_url : settings.logo;

      return _react2.default.createElement(
        'section',
        { className: 'section section-footer' },
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'footer',
          null,
          _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
              'div',
              { className: 'content' },
              _react2.default.createElement(
                'div',
                { className: 'columns is-gapless' },
                _react2.default.createElement(
                  'div',
                  { className: 'column is-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mobile-padding' },
                    _react2.default.createElement(
                      'div',
                      { className: 'footer-logo' },
                      _react2.default.createElement('img', { src: footerLogoUrl, alt: 'logo' })
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'small',
                        null,
                        _settings.themeSettings.footer_about
                      )
                    ),
                    _react2.default.createElement(Contacts, { contacts: _settings.themeSettings.footer_contacts }),
                    _react2.default.createElement(SocialIcons, { icons: _settings.themeSettings.footer_social })
                  )
                ),
                _react2.default.createElement('div', { className: 'column is-1 is-hidden-mobile' }),
                _react2.default.createElement(FooterMenu, { title: _settings.themeSettings.footer_menu_1_title, items: _settings.themeSettings.footer_menu_1_items }),
                _react2.default.createElement(FooterMenu, { title: _settings.themeSettings.footer_menu_2_title, items: _settings.themeSettings.footer_menu_2_items })
              )
            )
          )
        )
      );
    }
  }]);

  return Footer;
}(_react2.default.PureComponent);

exports.default = Footer;