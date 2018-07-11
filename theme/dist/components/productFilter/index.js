'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../../lib/settings');

var _sort = require('../sort');

var _sort2 = _interopRequireDefault(_sort);

var _priceSlider = require('./priceSlider');

var _priceSlider2 = _interopRequireDefault(_priceSlider);

var _attributeFilter = require('./attributeFilter');

var _attributeFilter2 = _interopRequireDefault(_attributeFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductFilter = function (_React$Component) {
  _inherits(ProductFilter, _React$Component);

  function ProductFilter(props) {
    _classCallCheck(this, ProductFilter);

    var _this = _possibleConstructorReturn(this, (ProductFilter.__proto__ || Object.getPrototypeOf(ProductFilter)).call(this, props));

    _this.sidebarToggle = function () {
      _this.setState({
        sidebarIsActive: !_this.state.sidebarIsActive
      });
      document.body.classList.toggle('noscroll');
    };

    _this.sidebarClose = function () {
      _this.setState({ sidebarIsActive: false });
      document.body.classList.remove('noscroll');
    };

    _this.state = {
      sidebarIsActive: false
    };
    return _this;
  }

  _createClass(ProductFilter, [{
    key: 'render',
    value: function render() {
      var sidebarIsActive = this.state.sidebarIsActive;
      var _props$state = this.props.state,
          categoryDetails = _props$state.categoryDetails,
          categories = _props$state.categories,
          settings = _props$state.settings,
          productFilter = _props$state.productFilter,
          productsMinPrice = _props$state.productsMinPrice,
          productsMaxPrice = _props$state.productsMaxPrice,
          productsAttributes = _props$state.productsAttributes;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'is-hidden-tablet' },
          _react2.default.createElement(
            'button',
            { className: 'button is-fullwidth', onClick: this.sidebarToggle },
            _settings.text.filterProducts
          )
        ),
        _react2.default.createElement(
          'div',
          { className: sidebarIsActive ? 'modal is-active' : 'is-hidden-mobile', style: { zIndex: 101 } },
          _react2.default.createElement('div', { className: sidebarIsActive ? 'dark-overflow' : '', onClick: this.sidebarClose }),
          _react2.default.createElement(
            'div',
            { className: sidebarIsActive ? 'modal-content' : '' },
            _react2.default.createElement(
              'div',
              { className: sidebarIsActive ? 'box sidebar' : '' },
              _react2.default.createElement(
                'div',
                { className: 'is-hidden-tablet', style: { marginBottom: 30 } },
                _react2.default.createElement(_sort2.default, { defaultSort: settings.default_product_sorting, currentSort: productFilter.sort, setSort: this.props.setSort })
              ),
              _react2.default.createElement(_attributeFilter2.default, {
                attributes: productsAttributes,
                setFilterAttribute: this.props.setFilterAttribute,
                unsetFilterAttribute: this.props.unsetFilterAttribute
              }),
              _react2.default.createElement(_priceSlider2.default, {
                minPrice: productsMinPrice,
                maxPrice: productsMaxPrice,
                minValue: productFilter.priceFrom,
                maxValue: productFilter.priceTo,
                setPriceFromAndTo: this.props.setPriceFromAndTo,
                settings: settings
              }),
              _react2.default.createElement(
                'button',
                { className: 'button is-fullwidth is-dark is-hidden-tablet', onClick: this.sidebarClose },
                _settings.text.close
              )
            )
          )
        )
      );
    }
  }]);

  return ProductFilter;
}(_react2.default.Component);

exports.default = ProductFilter;