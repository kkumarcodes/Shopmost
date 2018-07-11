'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../lib/settings');

var _metaTags = require('../components/metaTags');

var _metaTags2 = _interopRequireDefault(_metaTags);

var _productDetails = require('../components/productDetails');

var _productDetails2 = _interopRequireDefault(_productDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fragment = _react2.default.Fragment;

var ProductContainer = function ProductContainer(props) {
  var _props$state = props.state,
      productDetails = _props$state.productDetails,
      settings = _props$state.settings,
      categories = _props$state.categories;
  var addCartItem = props.addCartItem,
      getJSONLD = props.getJSONLD;


  if (productDetails) {
    var images = productDetails.images;
    var imageUrl = images && images.length > 0 ? images[0].url : null;
    var title = productDetails.meta_title && productDetails.meta_title.length > 0 ? productDetails.meta_title : productDetails.name;
    var jsonld = getJSONLD(props.state);

    return _react2.default.createElement(
      Fragment,
      null,
      _react2.default.createElement(_metaTags2.default, {
        title: title,
        description: productDetails.meta_description,
        canonicalUrl: productDetails.url,
        imageUrl: imageUrl,
        ogType: 'product',
        ogTitle: productDetails.name,
        ogDescription: productDetails.meta_description,
        jsonld: jsonld
      }),
      _react2.default.createElement(_productDetails2.default, {
        settings: settings,
        product: productDetails,
        addCartItem: addCartItem,
        categories: categories
      })
    );
  } else {
    return null;
  }
};

exports.default = ProductContainer;