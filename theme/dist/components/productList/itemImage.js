'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../../lib/settings');

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

var _reactLazyload = require('react-lazyload');

var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemImage = function ItemImage(_ref) {
  var images = _ref.images,
      productName = _ref.productName,
      height = _ref.height;

  if (images && images.length > 0) {
    var image = images[0];
    var imageUrl = helper.getThumbnailUrl(image.url, _settings.themeSettings.listThumbnailWidth);
    var alt = image.alt && image.alt.length > 0 ? image.alt : productName;

    return _react2.default.createElement(
      _reactLazyload2.default,
      { height: height },
      _react2.default.createElement('img', { src: imageUrl, alt: alt, title: alt })
    );
  } else {
    return _react2.default.createElement('div', { style: { height: height }, className: 'small-image-placeholder' });
  }
};

exports.default = ItemImage;