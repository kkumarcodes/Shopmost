'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactImageGallery = require('react-image-gallery');

var _reactImageGallery2 = _interopRequireDefault(_reactImageGallery);

var _reactImageLightbox = require('react-image-lightbox');

var _reactImageLightbox2 = _interopRequireDefault(_reactImageLightbox);

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

var _settings = require('../../lib/settings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fragment = _react2.default.Fragment;

var Gallery = function (_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery(props) {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

    _this.openLightbox = function () {
      _this.setState({ lightboxIsOpen: true });
    };

    _this.closeLightbox = function () {
      _this.setState({ lightboxIsOpen: false });
    };

    _this.setPhotoIndex = function (index) {
      _this.setState({ lightboxPhotoIndex: index });
    };

    _this.state = {
      lightboxIsOpen: false,
      lightboxPhotoIndex: 0
    };
    return _this;
  }

  _createClass(Gallery, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var images = this.props.images;
      var _state = this.state,
          lightboxIsOpen = _state.lightboxIsOpen,
          lightboxPhotoIndex = _state.lightboxPhotoIndex;


      if (images && images.length > 0) {
        var imagesArray = images.map(function (image) {
          return {
            original: helper.getThumbnailUrl(image.url, _settings.themeSettings.bigThumbnailWidth),
            thumbnail: helper.getThumbnailUrl(image.url, _settings.themeSettings.previewThumbnailWidth),
            originalAlt: image.alt,
            thumbnailAlt: image.alt
          };
        });

        var originalImages = images.map(function (image) {
          return image.url;
        });
        var showThumbnails = images.length > 1;

        return _react2.default.createElement(
          Fragment,
          null,
          _react2.default.createElement(_reactImageGallery2.default, {
            items: imagesArray,
            showThumbnails: showThumbnails,
            onClick: this.openLightbox,
            lazyLoad: true,
            slideInterval: 2000,
            showNav: _settings.themeSettings.product_gallery_shownav === true,
            showBullets: showThumbnails,
            showPlayButton: false,
            showFullscreenButton: false,
            slideOnThumbnailHover: true,
            thumbnailPosition: _settings.themeSettings.product_thumbnail_position,
            onSlide: this.setPhotoIndex
          }),
          lightboxIsOpen && _react2.default.createElement(_reactImageLightbox2.default, {
            reactModalStyle: { overlay: { zIndex: 1099 } },
            mainSrc: originalImages[lightboxPhotoIndex],
            nextSrc: originalImages[(lightboxPhotoIndex + 1) % originalImages.length],
            prevSrc: originalImages[(lightboxPhotoIndex + originalImages.length - 1) % originalImages.length],

            onCloseRequest: this.closeLightbox,
            onMovePrevRequest: function onMovePrevRequest() {
              return _this2.setState({
                lightboxPhotoIndex: (lightboxPhotoIndex + originalImages.length - 1) % originalImages.length
              });
            },
            onMoveNextRequest: function onMoveNextRequest() {
              return _this2.setState({
                lightboxPhotoIndex: (lightboxPhotoIndex + 1) % originalImages.length
              });
            }
          })
        );
      } else {
        return _react2.default.createElement('div', { className: 'large-image-placeholder' });
      }
    }
  }]);

  return Gallery;
}(_react2.default.Component);

exports.default = Gallery;