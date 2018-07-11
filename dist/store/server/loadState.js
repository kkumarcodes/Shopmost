'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadState = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _actions = require('../shared/actions');

var _themeLocales = require('./themeLocales');

var themeLocales = _interopRequireWildcard(_themeLocales);

var _pageTypes = require('../shared/pageTypes');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PRODUCT_FIELDS = 'path,id,name,category_id,category_ids,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags,position';
var CATEGORIES_FIELDS = 'image,name,description,meta_description,meta_title,sort,parent_id,position,slug,id';

var getCurrentPage = function getCurrentPage(path) {
  return _api2.default.sitemap.retrieve({ path: path, enabled: true }).then(function (sitemapResponse) {
    if (sitemapResponse.status === 200) {
      return sitemapResponse.json;
    } else if (sitemapResponse.status === 404) {
      return {
        type: 404,
        path: path,
        resource: null
      };
    } else {
      return Promise.reject('Page response code = ' + sitemapResponse.status);
    }
  });
};

var getProducts = function getProducts(currentPage, productFilter) {
  if (currentPage.type === _pageTypes.PRODUCT_CATEGORY || currentPage.type === _pageTypes.SEARCH) {
    var filter = (0, _actions.getParsedProductFilter)(productFilter);
    filter.enabled = true;
    return _api2.default.products.list(filter).then(function (_ref) {
      var status = _ref.status,
          json = _ref.json;
      return json;
    });
  } else {
    return null;
  }
};

var getProduct = function getProduct(currentPage) {
  if (currentPage.type === _pageTypes.PRODUCT) {
    return _api2.default.products.retrieve(currentPage.resource).then(function (_ref2) {
      var status = _ref2.status,
          json = _ref2.json;
      return json;
    });
  } else {
    return {};
  }
};

var getPage = function getPage(currentPage) {
  if (currentPage.type === _pageTypes.PAGE) {
    return _api2.default.pages.retrieve(currentPage.resource).then(function (_ref3) {
      var status = _ref3.status,
          json = _ref3.json;
      return json;
    });
  } else {
    return {};
  }
};

var getThemeSettings = function getThemeSettings() {
  return _api2.default.theme.settings.retrieve().then(function (_ref4) {
    var status = _ref4.status,
        json = _ref4.json;
    return json;
  }).catch(function (err) {
    return {};
  });
};

var getAllData = function getAllData(currentPage, productFilter, cookie) {
  return Promise.all([_api2.default.checkoutFields.list().then(function (_ref5) {
    var status = _ref5.status,
        json = _ref5.json;
    return json;
  }), _api2.default.productCategories.list({ enabled: true, fields: CATEGORIES_FIELDS }).then(function (_ref6) {
    var status = _ref6.status,
        json = _ref6.json;
    return json;
  }), _api2.default.ajax.cart.retrieve(cookie).then(function (_ref7) {
    var status = _ref7.status,
        json = _ref7.json;
    return json;
  }), getProducts(currentPage, productFilter), getProduct(currentPage), getPage(currentPage), getThemeSettings()]).then(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 7),
        checkoutFields = _ref9[0],
        categories = _ref9[1],
        cart = _ref9[2],
        products = _ref9[3],
        product = _ref9[4],
        page = _ref9[5],
        themeSettings = _ref9[6];

    var categoryDetails = null;
    if (currentPage.type === _pageTypes.PRODUCT_CATEGORY) {
      categoryDetails = categories.find(function (c) {
        return c.id === currentPage.resource;
      });
    }
    return {
      checkoutFields: checkoutFields,
      categories: categories,
      cart: cart,
      products: products,
      product: product,
      page: page,
      categoryDetails: categoryDetails,
      themeSettings: themeSettings
    };
  });
};

var getState = function getState(currentPage, settings, allData, location, productFilter) {
  var checkoutFields = allData.checkoutFields,
      categories = allData.categories,
      cart = allData.cart,
      products = allData.products,
      product = allData.product,
      page = allData.page,
      categoryDetails = allData.categoryDetails,
      themeSettings = allData.themeSettings;


  var productsTotalCount = 0;
  var productsHasMore = false;
  var productsMinPrice = 0;
  var productsMaxPrice = 0;
  var productsAttributes = [];

  if (products) {
    productsTotalCount = products.total_count;
    productsHasMore = products.has_more;
    productsAttributes = products.attributes;

    if (products.price) {
      productsMinPrice = products.price.min;
      productsMaxPrice = products.price.max;
    }
  }

  var state = { app: {
      settings: settings,
      location: location,
      currentPage: currentPage,
      pageDetails: page,
      categoryDetails: categoryDetails,
      productDetails: product,
      categories: categories,
      products: products && products.data ? products.data : [],
      productsTotalCount: productsTotalCount,
      productsHasMore: productsHasMore,
      productsMinPrice: productsMinPrice,
      productsMaxPrice: productsMaxPrice,
      productsAttributes: productsAttributes,
      paymentMethods: [],
      shippingMethods: [],
      loadingProducts: false,
      loadingMoreProducts: false,
      loadingShippingMethods: false,
      loadingPaymentMethods: false,
      processingCheckout: false,
      productFilter: {
        onSale: null,
        search: productFilter.search || '',
        categoryId: productFilter.categoryId,
        priceFrom: productFilter.priceFrom || 0,
        priceTo: productFilter.priceTo || 0,
        attributes: productFilter.attributes,
        sort: settings.default_product_sorting,
        fields: settings.product_fields && settings.product_fields !== '' ? settings.product_fields : PRODUCT_FIELDS,
        limit: settings.products_limit && settings.products_limit !== 0 ? settings.products_limit : 30
      },
      cart: cart,
      order: null,
      checkoutFields: checkoutFields,
      themeSettings: themeSettings
    }
  };

  return state;
};

var getFilter = function getFilter(currentPage, urlQuery, settings) {
  var productFilter = {};

  if (currentPage.type === _pageTypes.PRODUCT_CATEGORY) {
    productFilter = (0, _actions.getProductFilterForCategory)(urlQuery, settings.default_product_sorting);
    productFilter.categoryId = currentPage.resource;
  } else if (currentPage.type === _pageTypes.SEARCH) {
    productFilter = (0, _actions.getProductFilterForSearch)(urlQuery);
  }

  productFilter.fields = settings.product_fields && settings.product_fields !== '' ? settings.product_fields : PRODUCT_FIELDS;
  productFilter.limit = settings.products_limit && settings.products_limit !== 0 ? settings.products_limit : 30;

  return productFilter;
};

var loadState = exports.loadState = function loadState(req, language) {
  var cookie = req.get('cookie');
  var urlPath = req.path;
  var urlQuery = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  var location = {
    hasHistory: false,
    pathname: urlPath,
    search: urlQuery,
    hash: ''
  };

  return Promise.all([getCurrentPage(req.path), _api2.default.settings.retrieve().then(function (_ref10) {
    var status = _ref10.status,
        json = _ref10.json;
    return json;
  }), themeLocales.getText(language), _api2.default.theme.placeholders.list()]).then(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 4),
        currentPage = _ref12[0],
        settings = _ref12[1],
        themeText = _ref12[2],
        placeholdersResponse = _ref12[3];

    var productFilter = getFilter(currentPage, urlQuery, settings);

    return getAllData(currentPage, productFilter, cookie).then(function (allData) {
      var state = getState(currentPage, settings, allData, location, productFilter);
      return {
        state: state,
        themeText: themeText,
        placeholders: placeholdersResponse.json
      };
    });
  });
};