'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../lib/settings');

var _metaTags = require('../components/metaTags');

var _metaTags2 = _interopRequireDefault(_metaTags);

var _productList = require('../components/productList');

var _productList2 = _interopRequireDefault(_productList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fragment = _react2.default.Fragment;

var CategoryContainer = function CategoryContainer(props) {
  var _props$state = props.state,
      products = _props$state.products,
      settings = _props$state.settings,
      productFilter = _props$state.productFilter,
      productsHasMore = _props$state.productsHasMore,
      productsMinPrice = _props$state.productsMinPrice,
      productsMaxPrice = _props$state.productsMaxPrice,
      productsTotalCount = _props$state.productsTotalCount;
  var setSearch = props.setSearch,
      setSort = props.setSort,
      setPriceFromAndTo = props.setPriceFromAndTo,
      addCartItem = props.addCartItem,
      loadMoreProducts = props.loadMoreProducts;

  var searchNotEmpty = productFilter.search && productFilter.search !== '';
  var searchDescription = searchNotEmpty ? _settings.text.resultsFor + ' "' + productFilter.search + '"' : _settings.text.search;
  var title = searchNotEmpty ? productFilter.search + ' - ' + _settings.text.search : _settings.text.search;

  return _react2.default.createElement(
    Fragment,
    null,
    _react2.default.createElement(_metaTags2.default, {
      title: title
    }),
    _react2.default.createElement(
      'section',
      { className: 'hero is-light' },
      _react2.default.createElement(
        'div',
        { className: 'hero-body' },
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            'h1',
            { className: 'title is-4' },
            searchDescription
          )
        )
      )
    ),
    _react2.default.createElement(
      'section',
      { className: 'section' },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(_productList2.default, {
          products: products,
          addCartItem: addCartItem,
          settings: settings,
          loadMoreProducts: loadMoreProducts,
          hasMore: productsHasMore
        })
      )
    )
  );
};

exports.default = CategoryContainer;