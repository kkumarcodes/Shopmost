'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../../lib/settings');

var _custom = require('../products/custom');

var _custom2 = _interopRequireDefault(_custom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fragment = _react2.default.Fragment;

var RelatedProducts = function (_React$PureComponent) {
  _inherits(RelatedProducts, _React$PureComponent);

  function RelatedProducts(props) {
    _classCallCheck(this, RelatedProducts);

    return _possibleConstructorReturn(this, (RelatedProducts.__proto__ || Object.getPrototypeOf(RelatedProducts)).call(this, props));
  }

  _createClass(RelatedProducts, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          ids = _props.ids,
          settings = _props.settings,
          addCartItem = _props.addCartItem,
          limit = _props.limit;

      if (ids && ids.length > 0) {
        var title = _settings.themeSettings.related_products_title && _settings.themeSettings.related_products_title.length > 0 ? _settings.themeSettings.related_products_title : _settings.text.relatedProducts;

        return _react2.default.createElement(
          'section',
          { className: 'section section-product-related' },
          _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
              'div',
              { className: 'title is-4 has-text-centered' },
              title
            ),
            _react2.default.createElement(_custom2.default, {
              ids: ids,
              sort: null,
              limit: limit,
              isCentered: true,
              settings: settings,
              addCartItem: addCartItem
            })
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return RelatedProducts;
}(_react2.default.PureComponent);

exports.default = RelatedProducts;