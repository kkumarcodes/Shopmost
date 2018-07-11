'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxForm = require('redux-form');

var _actionTypes = require('./actionTypes');

var t = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {};

var appReducer = function appReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case t.PRODUCT_RECEIVE:
      return Object.assign({}, state, { productDetails: action.product });

    case t.PRODUCTS_REQUEST:
      return Object.assign({}, state, { loadingProducts: true });

    case t.PRODUCTS_RECEIVE:
      if (action.products) {
        return Object.assign({}, state, {
          loadingProducts: false,
          products: action.products.data,
          productsTotalCount: action.products.total_count,
          productsHasMore: action.products.has_more,
          productsAttributes: action.products.attributes,
          productsMinPrice: action.products.price.min || 0,
          productsMaxPrice: action.products.price.max || 0
        });
      } else {
        return Object.assign({}, state, {
          products: []
        });
      }

    case t.MORE_PRODUCTS_REQUEST:
      return Object.assign({}, state, { loadingMoreProducts: true });

    case t.MORE_PRODUCTS_RECEIVE:
      return Object.assign({}, state, {
        loadingMoreProducts: false,
        products: [].concat(_toConsumableArray(state.products), _toConsumableArray(action.products.data)),
        productsTotalCount: action.products.total_count,
        productsHasMore: action.products.has_more
      });

    case t.PAGE_RECEIVE:
      return Object.assign({}, state, { pageDetails: action.pageDetails });

    case t.CART_RECEIVE:
      return Object.assign({}, state, { cart: action.cart });

    case t.SHIPPING_METHODS_REQUEST:
      return Object.assign({}, state, { loadingShippingMethods: true });

    case t.SHIPPING_METHODS_RECEIVE:
      return Object.assign({}, state, {
        shippingMethods: action.methods,
        loadingShippingMethods: false
      });

    case t.PAYMENT_METHODS_REQUEST:
      return Object.assign({}, state, { loadingPaymentMethods: true });

    case t.PAYMENT_METHODS_RECEIVE:
      return Object.assign({}, state, {
        paymentMethods: action.methods,
        loadingPaymentMethods: false
      });

    case t.CHECKOUT_REQUEST:
      return Object.assign({}, state, { processingCheckout: true });

    case t.CHECKOUT_RECEIVE:
      return Object.assign({}, state, {
        cart: null,
        order: action.order,
        processingCheckout: false
      });

    case t.SITEMAP_RECEIVE:
      return Object.assign({}, state, { currentPage: action.currentPage });

    case t.SET_CURRENT_CATEGORY:
      return Object.assign({}, state, { categoryDetails: action.category });

    case t.SET_PRODUCTS_FILTER:
      return Object.assign({}, state, {
        productFilter: Object.assign({}, state.productFilter, action.filter)
      });

    case t.LOCATION_CHANGED:
      return Object.assign({}, state, { location: action.location });

    case t.PRODUCT_REQUEST:
    case t.PAGE_REQUEST:
    case t.CART_REQUEST:
    case t.CART_ITEM_ADD_REQUEST:
    case t.CART_ITEM_DELETE_REQUEST:
    case t.CART_ITEM_UPDATE_REQUEST:
    case t.SITEMAP_REQUEST:
    default:
      return state;
  }
};

exports.default = (0, _redux.combineReducers)({ app: appReducer, form: _reduxForm.reducer });