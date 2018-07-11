'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MetaTags = function MetaTags(_ref) {
  var title = _ref.title,
      description = _ref.description,
      canonicalUrl = _ref.canonicalUrl,
      imageUrl = _ref.imageUrl,
      ogType = _ref.ogType,
      ogTitle = _ref.ogTitle,
      ogDescription = _ref.ogDescription,
      jsonld = _ref.jsonld;

  var metaArray = [];
  var linkArray = [];

  if (description && description.length > 0) {
    metaArray.push({
      name: 'description',
      content: description
    });
  }

  if (canonicalUrl && canonicalUrl.length > 0) {
    linkArray.push({
      rel: 'canonical',
      href: canonicalUrl
    });

    metaArray.push({
      property: 'og:url',
      content: canonicalUrl
    });
  }

  if (imageUrl && imageUrl.length > 0) {
    metaArray.push({
      property: 'og:image',
      content: imageUrl
    });

    linkArray.push({
      rel: 'image_src',
      href: imageUrl
    });
  }

  if (ogType && ogType.length > 0) {
    metaArray.push({
      property: 'og:type',
      content: ogType
    });
  }

  if (ogTitle && ogTitle.length > 0) {
    metaArray.push({
      property: 'og:title',
      content: ogTitle
    });
  }

  if (ogDescription && ogDescription.length > 0) {
    metaArray.push({
      property: 'og:description',
      content: ogDescription
    });
  }

  var scriptJSONLD = jsonld && jsonld.length > 0 ? _react2.default.createElement(
    'script',
    { type: 'application/ld+json' },
    jsonld
  ) : null;

  return _react2.default.createElement(
    _reactHelmet2.default,
    { title: title, meta: metaArray, link: linkArray },
    scriptJSONLD
  );
};

exports.default = MetaTags;