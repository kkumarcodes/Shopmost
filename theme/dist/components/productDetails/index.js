'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

var _settings = require('../../lib/settings');

var _disqus = require('../comments/disqus');

var _disqus2 = _interopRequireDefault(_disqus);

var _viewed = require('../products/viewed');

var _viewed2 = _interopRequireDefault(_viewed);

var _breadcrumbs = require('./breadcrumbs');

var _breadcrumbs2 = _interopRequireDefault(_breadcrumbs);

var _discountCountdown = require('./discountCountdown');

var _discountCountdown2 = _interopRequireDefault(_discountCountdown);

var _addToCartButton = require('./addToCartButton');

var _addToCartButton2 = _interopRequireDefault(_addToCartButton);

var _attributes = require('./attributes');

var _attributes2 = _interopRequireDefault(_attributes);

var _gallery = require('./gallery');

var _gallery2 = _interopRequireDefault(_gallery);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _price = require('./price');

var _price2 = _interopRequireDefault(_price);

var _quantity = require('./quantity');

var _quantity2 = _interopRequireDefault(_quantity);

var _relatedProducts = require('./relatedProducts');

var _relatedProducts2 = _interopRequireDefault(_relatedProducts);

var _tags = require('./tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fragment = _react2.default.Fragment;

var Description = function Description(_ref) {
  var description = _ref.description;
  return _react2.default.createElement('div', { className: 'product-content', dangerouslySetInnerHTML: { __html: description } });
};

var ProductDetails = function (_React$Component) {
  _inherits(ProductDetails, _React$Component);

  function ProductDetails(props) {
    _classCallCheck(this, ProductDetails);

    var _this = _possibleConstructorReturn(this, (ProductDetails.__proto__ || Object.getPrototypeOf(ProductDetails)).call(this, props));

    _this.setQuantity = function (quantity) {
      _this.setState({ quantity: quantity });
    };

    _this.state = {
      selectedOptions: {},
      selectedVariant: null,
      isAllOptionsSelected: false,
      quantity: 1
    };

    _this.onOptionChange = _this.onOptionChange.bind(_this);
    _this.findVariantBySelectedOptions = _this.findVariantBySelectedOptions.bind(_this);
    _this.addToCart = _this.addToCart.bind(_this);
    _this.checkSelectedOptions = _this.checkSelectedOptions.bind(_this);
    return _this;
  }

  _createClass(ProductDetails, [{
    key: 'onOptionChange',
    value: function onOptionChange(optionId, valueId) {
      var selectedOptions = this.state.selectedOptions;


      if (valueId === '') {
        delete selectedOptions[optionId];
      } else {
        selectedOptions[optionId] = valueId;
      }

      this.setState({ selectedOptions: selectedOptions });
      this.findVariantBySelectedOptions();
      this.checkSelectedOptions();
    }
  }, {
    key: 'findVariantBySelectedOptions',
    value: function findVariantBySelectedOptions() {
      var selectedOptions = this.state.selectedOptions;
      var product = this.props.product;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = product.variants[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var variant = _step.value;

          var variantMutchSelectedOptions = variant.options.every(function (variantOption) {
            return selectedOptions[variantOption.option_id] === variantOption.value_id;
          });
          if (variantMutchSelectedOptions) {
            this.setState({ selectedVariant: variant });
            return;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.setState({ selectedVariant: null });
    }
  }, {
    key: 'addToCart',
    value: function addToCart() {
      var _props = this.props,
          product = _props.product,
          addCartItem = _props.addCartItem;
      var _state = this.state,
          selectedVariant = _state.selectedVariant,
          quantity = _state.quantity;


      var item = {
        product_id: product.id,
        quantity: quantity
      };

      if (selectedVariant) {
        item.variant_id = selectedVariant.id;
      }

      addCartItem(item);
    }
  }, {
    key: 'checkSelectedOptions',
    value: function checkSelectedOptions() {
      var selectedOptions = this.state.selectedOptions;
      var product = this.props.product;


      var allOptionsSelected = Object.keys(selectedOptions).length === product.options.length;
      this.setState({ isAllOptionsSelected: allOptionsSelected });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          product = _props2.product,
          settings = _props2.settings,
          categories = _props2.categories;
      var _state2 = this.state,
          selectedVariant = _state2.selectedVariant,
          isAllOptionsSelected = _state2.isAllOptionsSelected;

      var maxQuantity = product.stock_status === 'discontinued' ? 0 : product.stock_backorder ? _settings.themeSettings.maxCartItemQty : selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;

      if (product) {
        return _react2.default.createElement(
          Fragment,
          null,
          _react2.default.createElement(
            'section',
            { className: 'section section-product' },
            _react2.default.createElement(
              'div',
              { className: 'container' },
              _react2.default.createElement(
                'div',
                { className: 'columns' },
                _react2.default.createElement(
                  'div',
                  { className: 'column is-7' },
                  _settings.themeSettings.show_product_breadcrumbs && _react2.default.createElement(_breadcrumbs2.default, { product: product, categories: categories }),
                  _react2.default.createElement(_gallery2.default, { images: product.images })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'column is-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'content' },
                    _react2.default.createElement(_tags2.default, { tags: product.tags }),
                    _react2.default.createElement(
                      'h1',
                      { className: 'title is-4 product-name' },
                      product.name
                    ),
                    _react2.default.createElement(_price2.default, { product: product, variant: selectedVariant, isAllOptionsSelected: isAllOptionsSelected, settings: settings }),
                    _settings.themeSettings.show_discount_countdown && product.on_sale === true && _react2.default.createElement(_discountCountdown2.default, { product: product }),
                    _react2.default.createElement(_options2.default, { options: product.options, onChange: this.onOptionChange }),
                    _react2.default.createElement(_quantity2.default, { maxQuantity: maxQuantity, onChange: this.setQuantity }),
                    _react2.default.createElement(
                      'div',
                      { className: 'button-addtocart' },
                      _react2.default.createElement(_addToCartButton2.default, { product: product, variant: selectedVariant, addCartItem: this.addToCart, isAllOptionsSelected: isAllOptionsSelected })
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'section',
            { className: 'section section-product-description' },
            _react2.default.createElement(
              'div',
              { className: 'container' },
              _react2.default.createElement(
                'div',
                { className: 'content' },
                _react2.default.createElement(
                  'div',
                  { className: 'columns' },
                  _react2.default.createElement(
                    'div',
                    { className: 'column is-7' },
                    _react2.default.createElement(Description, { description: product.description })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'column is-5' },
                    _react2.default.createElement(_attributes2.default, { attributes: product.attributes })
                  )
                )
              )
            )
          ),
          _react2.default.createElement(_relatedProducts2.default, {
            settings: settings,
            addCartItem: this.addToCart,
            ids: product.related_product_ids,
            limit: 10
          }),
          _settings.themeSettings.show_viewed_products && _react2.default.createElement(_viewed2.default, {
            settings: settings,
            addCartItem: this.addToCart,
            product: product,
            limit: _settings.themeSettings.limit_viewed_products || 4
          }),
          _settings.themeSettings.disqus_shortname && _settings.themeSettings.disqus_shortname !== '' && _react2.default.createElement(
            'section',
            { className: 'section' },
            _react2.default.createElement(
              'div',
              { className: 'container' },
              _react2.default.createElement(_disqus2.default, {
                shortname: _settings.themeSettings.disqus_shortname,
                identifier: product.id,
                title: product.name,
                url: product.url
              })
            )
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return ProductDetails;
}(_react2.default.Component);

exports.default = ProductDetails;