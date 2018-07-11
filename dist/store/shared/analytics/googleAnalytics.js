'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var event = {
  PAGE_VIEW: 'page_view',
  VIEW_ITEM: 'view_item',
  BEGIN_CHECKOUT: 'begin_checkout',
  SEARCH: 'search',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  SET_CHECKOUT_OPTION: 'set_checkout_option',
  PURCHASE: 'purchase'
};

var pageView = exports.pageView = function pageView(_ref) {
  var path = _ref.path,
      title = _ref.title;

  logEvent({
    'eventName': event.PAGE_VIEW,
    'eventParameters': {
      'page_path': path,
      'page_title': title
    }
  });
};

var viewItem = exports.viewItem = function viewItem(_ref2) {
  var product = _ref2.product;

  var productData = {
    'id': product.sku && product.sku.length > 0 ? product.sku : product.id,
    'name': product.name,
    'category': product.category_name,
    'price': product.price.toString()
  };

  logEvent({
    'eventName': event.VIEW_ITEM,
    'eventParameters': {
      'items': [productData]
    }
  });
};

var addToCart = exports.addToCart = function addToCart(_ref3) {
  var item = _ref3.item,
      cart = _ref3.cart;

  var cartItem = cart && cart.items && cart.items.length > 0 ? cart.items.find(function (e) {
    return e.product_id === item.product_id && e.variant_id == item.variant_id;
  }) : null;
  if (!cartItem) {
    return;
  }

  var gaItem = {
    'id': cartItem.sku && cartItem.sku.length > 0 ? cartItem.sku : cartItem.product_id,
    'name': cartItem.name,
    'price': cartItem.price.toString(),
    'variant': cartItem.variant_name,
    'quantity': item.quantity
  };

  logEvent({
    'eventName': event.ADD_TO_CART,
    'eventParameters': {
      'items': [gaItem]
    }
  });
};

var removeFromCart = exports.removeFromCart = function removeFromCart(_ref4) {
  var itemId = _ref4.itemId,
      cart = _ref4.cart;

  var cartItem = cart && cart.items && cart.items.length > 0 ? cart.items.find(function (e) {
    return e.id === itemId;
  }) : null;
  if (!cartItem) {
    return;
  }

  var gaItem = {
    'id': cartItem.sku && cartItem.sku.length > 0 ? cartItem.sku : cartItem.product_id,
    'name': cartItem.name,
    'price': cartItem.price.toString(),
    'variant': cartItem.variant_name,
    'quantity': cartItem.quantity
  };

  logEvent({
    'eventName': event.REMOVE_FROM_CART,
    'eventParameters': {
      'items': [gaItem]
    }
  });
};

var setCheckoutOption = exports.setCheckoutOption = function setCheckoutOption(_ref5) {
  var step = _ref5.step,
      option = _ref5.option,
      value = _ref5.value;

  logEvent({
    'eventName': event.SET_CHECKOUT_OPTION,
    'eventParameters': {
      'checkout_step': step,
      'checkout_option': option,
      'value': value
    }
  });
};

var search = exports.search = function search(_ref6) {
  var searchText = _ref6.searchText;

  logEvent({
    'eventName': event.SEARCH,
    'eventParameters': {
      'search_term': searchText
    }
  });
};

var beginCheckout = exports.beginCheckout = function beginCheckout(_ref7) {
  var order = _ref7.order;

  var gaItems = order.items.map(function (item) {
    return {
      'id': item.sku && item.sku.length > 0 ? item.sku : item.product_id,
      'name': item.name,
      'price': item.price.toString(),
      'variant': item.variant_name,
      'quantity': item.quantity
    };
  });

  var gaPurchase = {
    'transaction_id': order.number,
    'value': order.grand_total,
    'items': gaItems
  };

  logEvent({
    'eventName': event.BEGIN_CHECKOUT,
    'eventParameters': gaPurchase
  });
};

var purchase = exports.purchase = function purchase(_ref8) {
  var order = _ref8.order;

  var gaItems = order.items.map(function (item) {
    return {
      'id': item.sku && item.sku.length > 0 ? item.sku : item.product_id,
      'name': item.name,
      'price': item.price.toString(),
      'variant': item.variant_name,
      'quantity': item.quantity
    };
  });

  var gaPurchase = {
    'transaction_id': order.number,
    'value': order.grand_total,
    'tax': order.tax_total.toString(),
    'shipping': order.shipping_price.toString(),
    'items': gaItems
  };

  logEvent({
    'eventName': event.PURCHASE,
    'eventParameters': gaPurchase
  });
};

var isGtagInstalled = function isGtagInstalled() {
  return typeof gtag !== 'undefined';
};

var logEvent = function logEvent(_ref9) {
  var eventName = _ref9.eventName,
      eventParameters = _ref9.eventParameters;

  if (isGtagInstalled()) {
    gtag('event', eventName, eventParameters);
  }
};