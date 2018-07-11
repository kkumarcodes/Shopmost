'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSONLD = undefined;

var _helper = require('./helper');

var _pageTypes = require('../pageTypes');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getBreadcrumbsForProduct = function getBreadcrumbsForProduct(product, categories) {
  if (product && product.category_id) {
    var ids = [product.category_id];
    var parentIds = (0, _helper.getParentIds)(categories, product.category_id);
    ids.push.apply(ids, _toConsumableArray(parentIds));

    var index = 0;
    var breadcrumbs = ids.reverse().map(function (categoryId) {
      var category = categories.find(function (item) {
        return item.id === categoryId;
      });
      if (category) {
        index++;
        return getBreadcrumbItem(category.url, category.name, index);
      }
    });

    return {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    };
  } else {
    return null;
  }
};

var getBreadcrumbsForCategory = function getBreadcrumbsForCategory(currentCategoryId, categories) {
  if (currentCategoryId) {
    var ids = (0, _helper.getParentIds)(categories, currentCategoryId);

    var index = 0;
    var breadcrumbs = ids.reverse().map(function (categoryId) {
      var category = categories.find(function (item) {
        return item.id === categoryId;
      });
      if (category) {
        index++;
        return getBreadcrumbItem(category.url, category.name, index);
      }
    });

    return {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    };
  } else {
    return null;
  }
};

var getBreadcrumbItem = function getBreadcrumbItem(url, name, position) {
  return {
    "@type": "ListItem",
    "position": position,
    "item": {
      "@id": url,
      "name": name
    }
  };
};

var getProduct = function getProduct(product, settings) {
  var imageUrl = product.images && product.images.length > 0 ? product.images[0].url : null;

  return {
    "@context": "http://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.meta_description,
    "image": imageUrl,
    "sku": product.sku,
    "offers": {
      "@type": "Offer",
      "priceCurrency": settings.currency_code,
      "price": product.price,
      "availability": product.stock_status === 'available' ? "http://schema.org/InStock" : "http://schema.org/OutOfStock"
    }
  };
};

var getProductJSONLD = function getProductJSONLD(product, categories, settings) {
  var jsonldArray = [];
  var breadcrumbs = getBreadcrumbsForProduct(product, categories);
  if (breadcrumbs) {
    jsonldArray.push(breadcrumbs);
  }
  jsonldArray.push(getProduct(product, settings));

  return jsonldArray.length > 0 ? JSON.stringify(jsonldArray) : '';
};

var getCategoryJSONLD = function getCategoryJSONLD(categoryId, categories) {
  var jsonldArray = [];
  var breadcrumbs = getBreadcrumbsForCategory(categoryId, categories);
  if (breadcrumbs) {
    jsonldArray.push(breadcrumbs);
  }
  return jsonldArray.length > 0 ? JSON.stringify(jsonldArray) : '';
};

var getJSONLD = exports.getJSONLD = function getJSONLD(state) {
  if (typeof window === 'undefined') {
    switch (state.currentPage.type) {
      case _pageTypes.PRODUCT:
        return getProductJSONLD(state.productDetails, state.categories, state.settings);
        break;
      case _pageTypes.PRODUCT_CATEGORY:
        return getCategoryJSONLD(state.categoryDetails.id, state.categories);
        break;
      default:
        return '';
    }
  } else {
    return '';
  }
};