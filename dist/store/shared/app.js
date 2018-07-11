'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _reactScroll = require('react-scroll');

var _index = require('./containers/index');

var _index2 = _interopRequireDefault(_index);

var _shared = require('./containers/shared');

var _shared2 = _interopRequireDefault(_shared);

var _category = require('./containers/category');

var _category2 = _interopRequireDefault(_category);

var _product = require('./containers/product');

var _product2 = _interopRequireDefault(_product);

var _page = require('./containers/page');

var _page2 = _interopRequireDefault(_page);

var _checkout = require('./containers/checkout');

var _checkout2 = _interopRequireDefault(_checkout);

var _checkoutSuccess = require('./containers/checkoutSuccess');

var _checkoutSuccess2 = _interopRequireDefault(_checkoutSuccess);

var _notfound = require('./containers/notfound');

var _notfound2 = _interopRequireDefault(_notfound);

var _search = require('./containers/search');

var _search2 = _interopRequireDefault(_search);

var _actions = require('./actions');

var _pageTypes = require('./pageTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwitchContainers = function (_React$Component) {
  _inherits(SwitchContainers, _React$Component);

  function SwitchContainers(props) {
    _classCallCheck(this, SwitchContainers);

    return _possibleConstructorReturn(this, (SwitchContainers.__proto__ || Object.getPrototypeOf(SwitchContainers)).call(this, props));
  }

  _createClass(SwitchContainers, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.props.setCurrentPage(nextProps.location);

      if (nextProps.location && this.props.location) {
        var pathnameChanged = nextProps.location.pathname !== this.props.location.pathname;
        var queryChanged = nextProps.location.search !== this.props.location.search;
        var isSearchPage = nextProps.location.pathname === '/search';

        if (pathnameChanged || queryChanged && isSearchPage) {
          _reactScroll.animateScroll.scrollToTop({
            duration: 500,
            delay: 100,
            smooth: true
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          history = _props.history,
          location = _props.location,
          currentPage = _props.currentPage;

      var locationPathname = location && location.pathname ? location.pathname : '/';

      switch (currentPage.type) {
        case _pageTypes.PRODUCT:
          return _react2.default.createElement(_product2.default, null);
        case _pageTypes.PRODUCT_CATEGORY:
          return _react2.default.createElement(_category2.default, null);
        case _pageTypes.SEARCH:
          return _react2.default.createElement(_search2.default, null);
        case _pageTypes.PAGE:
          if (locationPathname === '/') {
            return _react2.default.createElement(_index2.default, null);
          } else if (locationPathname === '/checkout') {
            return _react2.default.createElement(_checkout2.default, null);
          }if (locationPathname === '/checkout-success') {
            return _react2.default.createElement(_checkoutSuccess2.default, null);
          } else {
            return _react2.default.createElement(_page2.default, null);
          }
        default:
          return _react2.default.createElement(_notfound2.default, null);
      }
    }
  }]);

  return SwitchContainers;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    currentPage: state.app.currentPage
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    setCurrentPage: function setCurrentPage(location) {
      dispatch((0, _actions.setCurrentPage)(location));
    }
  };
};

var SwitchContainersConnected = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SwitchContainers);

var App = function App() {
  return _react2.default.createElement(
    _shared2.default,
    null,
    _react2.default.createElement(_reactRouter.Route, { component: SwitchContainersConnected })
  );
};

exports.default = App;