'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../../lib/settings');

var _cart = require('./cart');

var _cart2 = _interopRequireDefault(_cart);

var _cartIndicator = require('./cartIndicator');

var _cartIndicator2 = _interopRequireDefault(_cartIndicator);

var _searchBox = require('./searchBox');

var _searchBox2 = _interopRequireDefault(_searchBox);

var _headMenu = require('./headMenu');

var _headMenu2 = _interopRequireDefault(_headMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fragment = _react2.default.Fragment;

var Logo = function Logo(_ref) {
  var src = _ref.src,
      onClick = _ref.onClick,
      alt = _ref.alt;
  return _react2.default.createElement(
    _reactRouterDom.NavLink,
    { className: 'logo-image', to: '/', onClick: onClick },
    _react2.default.createElement('img', { src: src, alt: alt })
  );
};

var BurgerButton = function BurgerButton(_ref2) {
  var onClick = _ref2.onClick,
      className = _ref2.className;
  return _react2.default.createElement(
    'span',
    { className: className, onClick: onClick },
    _react2.default.createElement('span', null),
    _react2.default.createElement('span', null),
    _react2.default.createElement('span', null)
  );
};

var BackButton = function BackButton(_ref3) {
  var onClick = _ref3.onClick;
  return _react2.default.createElement(
    'span',
    { className: 'navbar-item is-hidden-tablet is-flex-mobile', onClick: onClick },
    _react2.default.createElement('img', { className: 'icon', src: '/assets/images/arrow_back.svg', style: { width: 18 } })
  );
};

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.menuToggle = function () {
      _this.setState({
        mobileMenuIsActive: !_this.state.mobileMenuIsActive,
        cartIsActive: false
      });
      document.body.classList.toggle('noscroll');
    };

    _this.searchToggle = function () {
      _this.setState({
        mobileSearchIsActive: !_this.state.mobileSearchIsActive
      });
      document.body.classList.toggle('search-active');
    };

    _this.menuClose = function () {
      _this.setState({ mobileMenuIsActive: false });
      document.body.classList.remove('noscroll');
    };

    _this.closeAll = function () {
      _this.setState({
        cartIsActive: false,
        mobileMenuIsActive: false
      });
      document.body.classList.remove('noscroll');
    };

    _this.cartToggle = function () {
      _this.setState({
        cartIsActive: !_this.state.cartIsActive,
        mobileMenuIsActive: false
      });
      document.body.classList.toggle('noscroll');
    };

    _this.showCart = function () {
      _this.setState({
        cartIsActive: true,
        mobileMenuIsActive: false
      });
      document.body.classList.add('noscroll');
    };

    _this.handleSearch = function (search) {
      if (_this.props.state.currentPage.path === '/search') {
        _this.props.setSearch(search);
      } else {
        if (search && search !== '') {
          _this.props.setLocation('/search?search=' + search);
        }
      }
    };

    _this.handleGoBack = function () {
      _this.closeAll();
      _this.props.goBack();
    };

    _this.state = {
      mobileMenuIsActive: false,
      mobileSearchIsActive: false,
      cartIsActive: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.state.cart !== nextProps.state.cart && this.props.state.currentPage.path !== '/checkout') {
        this.showCart();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$state = this.props.state,
          categories = _props$state.categories,
          cart = _props$state.cart,
          settings = _props$state.settings,
          currentPage = _props$state.currentPage,
          location = _props$state.location,
          productFilter = _props$state.productFilter;

      var classToggle = this.state.mobileMenuIsActive ? 'navbar-burger is-hidden-tablet is-active' : 'navbar-burger is-hidden-tablet';
      var showBackButton = currentPage.type === 'product' && location.hasHistory;

      return _react2.default.createElement(
        Fragment,
        null,
        _react2.default.createElement(
          'header',
          { className: this.state.mobileSearchIsActive ? 'search-active' : '' },
          _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
              'div',
              { className: 'columns is-gapless is-mobile header-container' },
              _react2.default.createElement(
                'div',
                { className: 'column is-4' },
                !showBackButton && _react2.default.createElement(BurgerButton, { onClick: this.menuToggle, className: classToggle }),
                showBackButton && _react2.default.createElement(BackButton, { onClick: this.handleGoBack })
              ),
              _react2.default.createElement(
                'div',
                { className: 'column is-4 has-text-centered' },
                _react2.default.createElement(Logo, { src: settings.logo, onClick: this.closeAll, alt: 'logo' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'column is-4 has-text-right header-block-right' },
                _react2.default.createElement(
                  'span',
                  { className: 'icon icon-search is-hidden-tablet', onClick: this.searchToggle },
                  _react2.default.createElement('img', { src: '/assets/images/search.svg', alt: _settings.text.search, title: _settings.text.search, style: { minWidth: 24 } })
                ),
                _react2.default.createElement(_searchBox2.default, { value: productFilter.search, onSearch: this.handleSearch, className: this.state.mobileSearchIsActive ? 'search-active' : '' }),
                _react2.default.createElement(_cartIndicator2.default, { cart: cart, onClick: this.cartToggle, cartIsActive: this.state.cartIsActive }),
                _react2.default.createElement(
                  'div',
                  { className: this.state.cartIsActive ? 'mini-cart-open' : '' },
                  _react2.default.createElement(_cart2.default, { cart: cart, deleteCartItem: this.props.deleteCartItem, settings: settings, cartToggle: this.cartToggle })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'primary-nav is-hidden-mobile' },
              _react2.default.createElement(_headMenu2.default, {
                categories: categories,
                location: location,
                isMobile: false
              })
            )
          )
        ),
        _react2.default.createElement('div', { className: this.state.mobileMenuIsActive || this.state.cartIsActive ? 'dark-overflow' : '', onClick: this.closeAll }),
        _react2.default.createElement(
          'div',
          { className: 'mobile-nav is-hidden-tablet' + (this.state.mobileMenuIsActive ? ' mobile-nav-open' : '') },
          _react2.default.createElement(_headMenu2.default, {
            isMobile: true,
            categories: categories,
            location: location,
            onClick: this.menuClose
          })
        )
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

exports.default = Header;