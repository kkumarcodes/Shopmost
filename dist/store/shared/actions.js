'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentPage = exports.updateShipping = exports.updateCart = exports.analyticsSetPaymentMethod = exports.analyticsSetShippingMethod = exports.updateCartPaymentMethod = exports.updateCartShippingMethod = exports.updateCartShippingCity = exports.updateCartShippingState = exports.updateCartShippingCountry = exports.setSort = exports.setCategory = exports.setCurrentLocation = exports.receiveSitemap = exports.checkout = exports.fetchShippingMethods = exports.fetchPaymentMethods = exports.deleteCartItem = exports.updateCartItemQuantiry = exports.addCartItem = exports.fetchCart = exports.fetchMoreProducts = exports.getParsedProductFilter = exports.getProductFilterForSearch = exports.getProductFilterForCategory = exports.fetchProducts = undefined;

var _actionTypes = require('./actionTypes');

var t = _interopRequireWildcard(_actionTypes);

var _pageTypes = require('./pageTypes');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _reactScroll = require('react-scroll');

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

var _analytics = require('./analytics');

var analytics = _interopRequireWildcard(_analytics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var requestProduct = function requestProduct() {
  return { type: t.PRODUCT_REQUEST };
};

var receiveProduct = function receiveProduct(product) {
  return { type: t.PRODUCT_RECEIVE, product: product };
};

var fetchProducts = exports.fetchProducts = function fetchProducts() {
  return function (dispatch, getState) {
    var _getState = getState(),
        app = _getState.app;

    dispatch(requestProducts());

    var filter = getParsedProductFilter(app.productFilter);

    return _api2.default.ajax.products.list(filter).then(function (_ref) {
      var status = _ref.status,
          json = _ref.json;

      dispatch(receiveProducts(null));
      dispatch(receiveProducts(json));
    }).catch(function (error) {});
  };
};

var getProductFilterForCategory = exports.getProductFilterForCategory = function getProductFilterForCategory(locationSearch, sortBy) {
  var queryFilter = _queryString2.default.parse(locationSearch);

  var attributes = {};
  for (var querykey in queryFilter) {
    if (querykey.startsWith('attributes.')) {
      attributes[querykey] = queryFilter[querykey];
    }
  }

  return {
    priceFrom: parseInt(queryFilter.price_from || 0),
    priceTo: parseInt(queryFilter.price_to || 0),
    attributes: attributes,
    search: null,
    sort: sortBy
  };
};

var getProductFilterForSearch = exports.getProductFilterForSearch = function getProductFilterForSearch(locationSearch) {
  var queryFilter = _queryString2.default.parse(locationSearch);

  return {
    categoryId: null,
    priceFrom: parseInt(queryFilter.price_from || 0),
    priceTo: parseInt(queryFilter.price_to || 0),
    search: queryFilter.search,
    sort: 'search'
  };
};

var getParsedProductFilter = exports.getParsedProductFilter = function getParsedProductFilter(productFilter) {
  var filter = Object.assign({}, {
    on_sale: productFilter.onSale,
    search: productFilter.search,
    category_id: productFilter.categoryId,
    price_from: productFilter.priceFrom,
    price_to: productFilter.priceTo,
    sort: productFilter['sort'],
    fields: productFilter['fields'],
    limit: productFilter['limit'],
    offset: 0
  }, productFilter.attributes);

  return filter;
};

var requestProducts = function requestProducts() {
  return { type: t.PRODUCTS_REQUEST };
};

var receiveProducts = function receiveProducts(products) {
  return { type: t.PRODUCTS_RECEIVE, products: products };
};

var fetchMoreProducts = exports.fetchMoreProducts = function fetchMoreProducts() {
  return function (dispatch, getState) {
    var _getState2 = getState(),
        app = _getState2.app;

    if (app.loadingProducts || app.loadingMoreProducts || app.products.length === 0 || !app.productsHasMore) {
      return Promise.resolve();
    } else {
      dispatch(requestMoreProducts());

      var filter = getParsedProductFilter(app.productFilter);
      filter.offset = app.products.length;

      return _api2.default.ajax.products.list(filter).then(function (_ref2) {
        var status = _ref2.status,
            json = _ref2.json;

        dispatch(receiveMoreProducts(json));
        _reactScroll.animateScroll.scrollMore(200);
      }).catch(function (error) {});
    }
  };
};

var requestMoreProducts = function requestMoreProducts() {
  return { type: t.MORE_PRODUCTS_REQUEST };
};

var receiveMoreProducts = function receiveMoreProducts(products) {
  return { type: t.MORE_PRODUCTS_RECEIVE, products: products };
};

var requestPage = function requestPage() {
  return { type: t.PAGE_REQUEST };
};

var receivePage = function receivePage(pageDetails) {
  return { type: t.PAGE_RECEIVE, pageDetails: pageDetails };
};

var fetchCart = exports.fetchCart = function fetchCart() {
  return function (dispatch, getState) {
    dispatch(requestCart());
    return _api2.default.ajax.cart.retrieve().then(function (_ref3) {
      var status = _ref3.status,
          json = _ref3.json;

      dispatch(receiveCart(json));
    }).catch(function (error) {});
  };
};

var requestCart = function requestCart() {
  return { type: t.CART_REQUEST };
};

var receiveCart = function receiveCart(cart) {
  return { type: t.CART_RECEIVE, cart: cart };
};

var addCartItem = exports.addCartItem = function addCartItem(item) {
  return function (dispatch, getState) {
    dispatch(requestAddCartItem());
    return _api2.default.ajax.cart.addItem(item).then(function (_ref4) {
      var status = _ref4.status,
          json = _ref4.json;

      dispatch(receiveCart(json));
      analytics.addCartItem({
        item: item,
        cart: json
      });
    }).catch(function (error) {});
  };
};

var requestAddCartItem = function requestAddCartItem() {
  return { type: t.CART_ITEM_ADD_REQUEST };
};

var updateCartItemQuantiry = exports.updateCartItemQuantiry = function updateCartItemQuantiry(item_id, quantity) {
  return function (dispatch, getState) {
    dispatch(requestUpdateCartItemQuantiry());
    return _api2.default.ajax.cart.updateItem(item_id, { quantity: quantity }).then(function (_ref5) {
      var status = _ref5.status,
          json = _ref5.json;

      dispatch(receiveCart(json));
      dispatch(fetchShippingMethods());
    }).catch(function (error) {});
  };
};

var requestUpdateCartItemQuantiry = function requestUpdateCartItemQuantiry() {
  return { type: t.CART_ITEM_UPDATE_REQUEST };
};

var deleteCartItem = exports.deleteCartItem = function deleteCartItem(item_id) {
  return function (dispatch, getState) {
    dispatch(requestDeleteCartItem());

    var _getState3 = getState(),
        app = _getState3.app;

    return _api2.default.ajax.cart.deleteItem(item_id).then(function (_ref6) {
      var status = _ref6.status,
          json = _ref6.json;

      dispatch(receiveCart(json));
      dispatch(fetchShippingMethods());
      analytics.deleteCartItem({
        itemId: item_id,
        cart: app.cart
      });
    }).catch(function (error) {});
  };
};

var requestDeleteCartItem = function requestDeleteCartItem() {
  return { type: t.CART_ITEM_DELETE_REQUEST };
};

var fetchPaymentMethods = exports.fetchPaymentMethods = function fetchPaymentMethods() {
  return function (dispatch, getState) {
    dispatch(requestPaymentMethods());
    return _api2.default.ajax.paymentMethods.list().then(function (_ref7) {
      var status = _ref7.status,
          json = _ref7.json;

      dispatch(receivePaymentMethods(json));
    }).catch(function (error) {});
  };
};

var requestPaymentMethods = function requestPaymentMethods() {
  return { type: t.PAYMENT_METHODS_REQUEST };
};

var receivePaymentMethods = function receivePaymentMethods(methods) {
  return { type: t.PAYMENT_METHODS_RECEIVE, methods: methods };
};

var fetchShippingMethods = exports.fetchShippingMethods = function fetchShippingMethods() {
  return function (dispatch, getState) {
    dispatch(requestShippingMethods());
    return _api2.default.ajax.shippingMethods.list().then(function (_ref8) {
      var status = _ref8.status,
          json = _ref8.json;

      dispatch(receiveShippingMethods(json));
    }).catch(function (error) {});
  };
};

var requestShippingMethods = function requestShippingMethods() {
  return { type: t.SHIPPING_METHODS_REQUEST };
};

var receiveShippingMethods = function receiveShippingMethods(methods) {
  return {
    type: t.SHIPPING_METHODS_RECEIVE,
    methods: methods
  };
};

var checkout = exports.checkout = function checkout(cart, history) {
  return function (dispatch, getState) {
    dispatch(requestCheckout());
    if (cart) {
      // update cart and checkout
      return _api2.default.ajax.cart.updateShippingAddress(cart.shipping_address).then(function () {
        return _api2.default.ajax.cart.updateBillingAddress(cart.billing_address);
      }).then(function () {
        return _api2.default.ajax.cart.update({
          email: cart.email,
          mobile: cart.mobile,
          payment_method_id: cart.payment_method_id,
          shipping_method_id: cart.shipping_method_id,
          comments: cart.comments
        });
      }).then(function () {
        return _api2.default.ajax.cart.checkout();
      }).then(function (orderResponse) {
        dispatch(receiveCheckout(orderResponse.json));
        history.push('/checkout-success');
        analytics.checkoutSuccess({ order: orderResponse.json });
      }).catch(function (error) {});
    } else {
      // just checkout
      return _api2.default.ajax.cart.checkout().then(function (orderResponse) {
        dispatch(receiveCheckout(orderResponse.json));
        history.push('/checkout-success');
        analytics.checkoutSuccess({ order: orderResponse.json });
      }).catch(function (error) {});
    }
  };
};

var requestCheckout = function requestCheckout() {
  return { type: t.CHECKOUT_REQUEST };
};

var receiveCheckout = function receiveCheckout(order) {
  return { type: t.CHECKOUT_RECEIVE, order: order };
};

var receiveSitemap = exports.receiveSitemap = function receiveSitemap(currentPage) {
  return { type: t.SITEMAP_RECEIVE, currentPage: currentPage };
};

var setCurrentLocation = exports.setCurrentLocation = function setCurrentLocation(location) {
  return { type: t.LOCATION_CHANGED, location: location };
};

var setCategory = exports.setCategory = function setCategory(categoryId) {
  return function (dispatch, getState) {
    var _getState4 = getState(),
        app = _getState4.app;

    var category = app.categories.find(function (c) {
      return c.id === categoryId;
    });
    if (category) {
      dispatch(setCurrentCategory(category));
      dispatch(setProductsFilter({ categoryId: categoryId }));
      dispatch(receiveProduct(null));
    }
  };
};

var setCurrentCategory = function setCurrentCategory(category) {
  return { type: t.SET_CURRENT_CATEGORY, category: category };
};

var setSort = exports.setSort = function setSort(sort) {
  return function (dispatch, getState) {
    dispatch(setProductsFilter({ sort: sort }));
    dispatch(fetchProducts());
  };
};

var setProductsFilter = function setProductsFilter(filter) {
  return { type: t.SET_PRODUCTS_FILTER, filter: filter };
};

var updateCartShippingCountry = exports.updateCartShippingCountry = function updateCartShippingCountry(country) {
  return function (dispatch, getState) {
    return [_api2.default.ajax.cart.updateShippingAddress({ country: country }), _api2.default.ajax.cart.update({ payment_method_id: null, shipping_method_id: null })].reduce(function (p, fn) {
      return p.then(function () {
        return fn;
      });
    }, Promise.resolve()).then(function (_ref9) {
      var status = _ref9.status,
          json = _ref9.json;

      dispatch(receiveCart(json));
      dispatch(fetchShippingMethods());
      dispatch(fetchPaymentMethods());
    }).catch(function (error) {});
  };
};

var updateCartShippingState = exports.updateCartShippingState = function updateCartShippingState(state) {
  return function (dispatch, getState) {
    return [_api2.default.ajax.cart.updateShippingAddress({ state: state }), _api2.default.ajax.cart.update({ payment_method_id: null, shipping_method_id: null })].reduce(function (p, fn) {
      return p.then(function () {
        return fn;
      });
    }, Promise.resolve()).then(function (_ref10) {
      var status = _ref10.status,
          json = _ref10.json;

      dispatch(receiveCart(json));
      dispatch(fetchShippingMethods());
      dispatch(fetchPaymentMethods());
    }).catch(function (error) {});
  };
};

var updateCartShippingCity = exports.updateCartShippingCity = function updateCartShippingCity(city) {
  return function (dispatch, getState) {
    return [_api2.default.ajax.cart.updateShippingAddress({ city: city }), _api2.default.ajax.cart.update({ payment_method_id: null, shipping_method_id: null })].reduce(function (p, fn) {
      return p.then(function () {
        return fn;
      });
    }, Promise.resolve()).then(function (_ref11) {
      var status = _ref11.status,
          json = _ref11.json;

      dispatch(receiveCart(json));
      dispatch(fetchShippingMethods());
      dispatch(fetchPaymentMethods());
    }).catch(function (error) {});
  };
};

var updateCartShippingMethod = exports.updateCartShippingMethod = function updateCartShippingMethod(method_id) {
  return function (dispatch, getState) {
    _api2.default.ajax.cart.update({ payment_method_id: null, shipping_method_id: method_id }).then(function (_ref12) {
      var status = _ref12.status,
          json = _ref12.json;

      dispatch(receiveCart(json));
      dispatch(fetchPaymentMethods());
    }).catch(function (error) {});
  };
};

var updateCartPaymentMethod = exports.updateCartPaymentMethod = function updateCartPaymentMethod(method_id) {
  return function (dispatch, getState) {
    _api2.default.ajax.cart.update({ payment_method_id: method_id }).then(function (_ref13) {
      var status = _ref13.status,
          json = _ref13.json;

      dispatch(receiveCart(json));
    }).catch(function (error) {});
  };
};

var analyticsSetShippingMethod = exports.analyticsSetShippingMethod = function analyticsSetShippingMethod(method_id) {
  return function (dispatch, getState) {
    var _getState5 = getState(),
        app = _getState5.app;

    analytics.setShippingMethod({
      methodId: method_id,
      allMethods: app.shippingMethods
    });
  };
};

var analyticsSetPaymentMethod = exports.analyticsSetPaymentMethod = function analyticsSetPaymentMethod(method_id) {
  return function (dispatch, getState) {
    var _getState6 = getState(),
        app = _getState6.app;

    analytics.setPaymentMethod({
      methodId: method_id,
      allMethods: app.paymentMethods
    });
  };
};

var updateCart = exports.updateCart = function updateCart(cart) {
  return function (dispatch, getState) {
    return [_api2.default.ajax.cart.update({
      email: cart.email,
      mobile: cart.mobile
    })].reduce(function (p, fn) {
      return p.then(function () {
        return fn;
      });
    }, Promise.resolve()).then(function (_ref14) {
      var status = _ref14.status,
          json = _ref14.json;

      dispatch(receiveCart(json));
    }).catch(function (error) {});
  };
};

var updateShipping = exports.updateShipping = function updateShipping(cart) {
  return function (dispatch, getState) {
    return [_api2.default.ajax.cart.updateShippingAddress(cart.shipping_address), _api2.default.ajax.cart.updateBillingAddress(cart.billing_address), _api2.default.ajax.cart.update({ comments: cart.comments })].reduce(function (p, fn) {
      return p.then(function () {
        return fn;
      });
    }, Promise.resolve()).then(function (_ref15) {
      var status = _ref15.status,
          json = _ref15.json;

      dispatch(receiveCart(json));
    }).catch(function (error) {});
  };
};

var setCurrentPage = exports.setCurrentPage = function setCurrentPage(location) {
  return function (dispatch, getState) {
    var locationPathname = '/404';
    var locationSearch = '';
    var locationHash = '';

    if (location) {
      locationPathname = location.pathname;
      locationSearch = location.search;
      locationHash = location.hash;
    }

    var _getState7 = getState(),
        app = _getState7.app;

    var statePathname = '/404';
    var stateSearch = '';
    var stateHash = '';

    if (app.location) {
      statePathname = app.location.pathname;
      stateSearch = app.location.search;
      stateHash = app.location.hash;
    }

    var currentPageAlreadyInState = statePathname === locationPathname && stateSearch === locationSearch;

    if (currentPageAlreadyInState) {
      // same page
    } else {
      dispatch(setCurrentLocation({
        hasHistory: true,
        pathname: locationPathname,
        search: locationSearch,
        hash: locationHash
      }));

      var category = app.categories.find(function (c) {
        return c.path === locationPathname;
      });
      if (category) {
        var newCurrentPage = {
          type: 'product-category',
          path: category.path,
          resource: category.id
        };
        dispatch(receiveSitemap(newCurrentPage)); // remove .data
        dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
      } else {

        _api2.default.ajax.sitemap.retrieve({ path: locationPathname }).then(function (sitemapResponse) {
          if (sitemapResponse.status === 404) {
            dispatch(receiveSitemap({
              type: 404,
              path: locationPathname,
              resource: null
            }));
          } else {
            var _newCurrentPage = sitemapResponse.json;
            dispatch(receiveSitemap(_newCurrentPage));
            dispatch(fetchDataOnCurrentPageChange(_newCurrentPage));
          }
        });
      }
    }
  };
};

var fetchDataOnCurrentPageChange = function fetchDataOnCurrentPageChange(currentPage) {
  return function (dispatch, getState) {
    var _getState8 = getState(),
        app = _getState8.app;

    var productFilter = null;

    // clear product data
    dispatch(receiveProduct(null));

    analytics.pageView({
      path: currentPage.path,
      title: '-'
    });

    switch (currentPage.type) {
      case _pageTypes.PRODUCT_CATEGORY:
        productFilter = getProductFilterForCategory(app.location.search, app.settings.default_product_sorting);
        dispatch(setCategory(currentPage.resource));
        dispatch(setProductsFilter(productFilter));
        dispatch(fetchProducts());
        break;
      case _pageTypes.SEARCH:
        productFilter = getProductFilterForSearch(app.location.search);
        dispatch(setProductsFilter(productFilter));
        dispatch(fetchProducts());
        analytics.search({ searchText: productFilter.search });
        break;
      case _pageTypes.PRODUCT:
        var productData = currentPage.data;
        dispatch(receiveProduct(productData));
        analytics.productView({ product: productData });
        break;
      case _pageTypes.PAGE:
        var pageData = currentPage.data;
        dispatch(receivePage(pageData));
        if (currentPage.path === '/checkout') {
          analytics.checkoutView({ order: app.cart });
        }
        break;
    }
  };
};