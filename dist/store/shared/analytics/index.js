'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setShippingMethod = exports.setPaymentMethod = exports.checkoutSuccess = exports.checkoutView = exports.deleteCartItem = exports.addCartItem = exports.search = exports.productView = exports.pageView = exports.onPageLoad = undefined;

var _pageTypes = require('../pageTypes');

var _googleAnalytics = require('./googleAnalytics');

var googleAnalytics = _interopRequireWildcard(_googleAnalytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var onPageLoad = exports.onPageLoad = function onPageLoad(_ref) {
  var state = _ref.state;
  var _state$app = state.app,
      currentPage = _state$app.currentPage,
      productDetails = _state$app.productDetails,
      productFilter = _state$app.productFilter,
      cart = _state$app.cart;


  switch (currentPage.type) {
    case _pageTypes.PRODUCT:
      productView({ product: productDetails });
      break;
    case _pageTypes.SEARCH:
      search({ searchText: productFilter.search });
      break;
    case _pageTypes.PAGE:
      if (currentPage.path === '/checkout') {
        checkoutView({ order: cart });
      }
      break;
  }
};

var pageView = exports.pageView = function pageView(_ref2) {
  var path = _ref2.path,
      title = _ref2.title;

  googleAnalytics.pageView({ path: path, title: title });
};

var productView = exports.productView = function productView(_ref3) {
  var product = _ref3.product;

  googleAnalytics.viewItem({ product: product });
};

var search = exports.search = function search(_ref4) {
  var searchText = _ref4.searchText;

  if (searchText && searchText.length > 0) {
    googleAnalytics.search({ searchText: searchText });
  }
};

var addCartItem = exports.addCartItem = function addCartItem(_ref5) {
  var item = _ref5.item,
      cart = _ref5.cart;

  googleAnalytics.addToCart({ item: item, cart: cart });
};

var deleteCartItem = exports.deleteCartItem = function deleteCartItem(_ref6) {
  var itemId = _ref6.itemId,
      cart = _ref6.cart;

  googleAnalytics.removeFromCart({ itemId: itemId, cart: cart });
};

var checkoutView = exports.checkoutView = function checkoutView(_ref7) {
  var order = _ref7.order;

  if (order && order.items && order.items.length > 0) {
    googleAnalytics.beginCheckout({ order: order });
  }
};

var checkoutSuccess = exports.checkoutSuccess = function checkoutSuccess(_ref8) {
  var order = _ref8.order;

  if (order && order.items && order.items.length > 0) {
    googleAnalytics.purchase({ order: order });
  }
};

var findMethodById = function findMethodById(_ref9) {
  var methodId = _ref9.methodId,
      allMethods = _ref9.allMethods;

  if (methodId && allMethods && allMethods.length > 0) {
    return allMethods.find(function (m) {
      return m.id === methodId;
    });
  } else {
    return null;
  }
};

var setPaymentMethod = exports.setPaymentMethod = function setPaymentMethod(_ref10) {
  var methodId = _ref10.methodId,
      allMethods = _ref10.allMethods;

  var method = findMethodById({ methodId: methodId, allMethods: allMethods });
  if (method) {
    googleAnalytics.setCheckoutOption({
      step: 1,
      option: 'payment method',
      value: method.name
    });
  }
};

var setShippingMethod = exports.setShippingMethod = function setShippingMethod(_ref11) {
  var methodId = _ref11.methodId,
      allMethods = _ref11.allMethods;

  var method = findMethodById({ methodId: methodId, allMethods: allMethods });
  if (method) {
    googleAnalytics.setCheckoutOption({
      step: 1,
      option: 'shipping method',
      value: method.name
    });
  }
};