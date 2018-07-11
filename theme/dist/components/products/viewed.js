'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

var _settings = require('../../lib/settings');

var _custom = require('./custom');

var _custom2 = _interopRequireDefault(_custom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fragment = _react2.default.Fragment;

var ViewedProducts = function (_React$Component) {
  _inherits(ViewedProducts, _React$Component);

  function ViewedProducts(props) {
    _classCallCheck(this, ViewedProducts);

    var _this = _possibleConstructorReturn(this, (ViewedProducts.__proto__ || Object.getPrototypeOf(ViewedProducts)).call(this, props));

    _this.getArrayFromLocalStorage = function () {
      var values = [];
      var viewedProducts = localStorage.getItem("viewedProducts");

      try {
        if (viewedProducts && viewedProducts.length > 0) {
          var viewedProductsParsed = JSON.parse(viewedProducts);
          if (Array.isArray(viewedProductsParsed)) {
            values = viewedProductsParsed;
          }
        }
      } catch (e) {};

      return values;
    };

    _this.addProductIdToLocalStorage = function (productId) {
      if (productId && productId.length > 0) {
        var viewedProducts = _this.getArrayFromLocalStorage();

        if (viewedProducts.includes(productId)) {
          var index = viewedProducts.indexOf(productId);
          viewedProducts.splice(index, 1);
          viewedProducts.push(productId);
        } else {
          viewedProducts.push(productId);
        }

        localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
        _this.setState({ viewedProducts: viewedProducts });
      }
    };

    _this.state = {
      viewedProducts: []
    };
    return _this;
  }

  _createClass(ViewedProducts, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var viewedProducts = this.getArrayFromLocalStorage();
      this.setState({ viewedProducts: viewedProducts });

      if (this.props.product && this.props.product.id) {
        this.addProductIdToLocalStorage(this.props.product.id);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.viewedProducts !== nextState.viewedProducts;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.product !== nextProps.product && nextProps.product && nextProps.product.id) {
        this.addProductIdToLocalStorage(nextProps.product.id);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          limit = _props.limit,
          settings = _props.settings,
          addCartItem = _props.addCartItem,
          product = _props.product;
      var viewedProducts = this.state.viewedProducts;


      if (viewedProducts && product && product.id) {
        viewedProducts = viewedProducts.filter(function (id) {
          return id !== product.id;
        });
      }

      if (viewedProducts && viewedProducts.length > 0) {
        var ids = viewedProducts.reverse().slice(0, limit);
        return _react2.default.createElement(
          'section',
          { className: 'section section-product-related' },
          _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
              'div',
              { className: 'title is-4 has-text-centered' },
              _settings.text.recentlyViewed
            ),
            _react2.default.createElement(_custom2.default, {
              ids: ids,
              settings: settings,
              addCartItem: addCartItem,
              limit: limit,
              isCentered: true
            })
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return ViewedProducts;
}(_react2.default.Component);

exports.default = ViewedProducts;