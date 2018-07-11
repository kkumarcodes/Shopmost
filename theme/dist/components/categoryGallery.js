'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../lib/settings');

var _helper = require('../lib/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GalleryItemImage = function GalleryItemImage(_ref) {
  var category = _ref.category;

  var imageUrl = category.image && category.image.length > 0 ? helper.getThumbnailUrl(category.image, _settings.themeSettings.category_list_thumbnail_width) : '';

  if (imageUrl && imageUrl !== '') {
    return _react2.default.createElement(
      'div',
      { className: 'card-image' },
      _react2.default.createElement(
        'figure',
        { className: 'image' },
        _react2.default.createElement('img', { src: imageUrl, alt: category.name })
      )
    );
  } else {
    return null;
  }
};

var GalleryItem = function GalleryItem(_ref2) {
  var category = _ref2.category;

  return _react2.default.createElement(
    'div',
    { className: 'column is-4-tablet is-12-mobile' },
    _react2.default.createElement(
      _reactRouterDom.NavLink,
      { to: category.path },
      _react2.default.createElement(
        'div',
        { className: 'card' },
        _react2.default.createElement(GalleryItemImage, { category: category }),
        _react2.default.createElement(
          'div',
          { className: 'card-content' },
          _react2.default.createElement(
            'div',
            { className: 'content' },
            _react2.default.createElement(
              'h3',
              { className: 'title is-6' },
              category.name
            )
          )
        )
      )
    )
  );
};

var CategoryGallery = function CategoryGallery(_ref3) {
  var categories = _ref3.categories;

  var items = categories.filter(function (category) {
    return category.parent_id === null;
  }).map(function (category, index) {
    return _react2.default.createElement(GalleryItem, { key: index, category: category });
  });
  return _react2.default.createElement(
    'div',
    { className: 'columns is-multiline is-mobile' },
    items
  );
};

exports.default = CategoryGallery;