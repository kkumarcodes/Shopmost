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

var _api = require('../../lib/api');

var _api2 = _interopRequireDefault(_api);

var _productList = require('../productList');

var _productList2 = _interopRequireDefault(_productList);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomProducts = function (_React$Component) {
  _inherits(CustomProducts, _React$Component);

  function CustomProducts(props) {
    _classCallCheck(this, CustomProducts);

    var _this = _possibleConstructorReturn(this, (CustomProducts.__proto__ || Object.getPrototypeOf(CustomProducts)).call(this, props));

    _this.fetchProducts = function (_ref) {
      var ids = _ref.ids,
          sku = _ref.sku,
          sort = _ref.sort,
          limit = _ref.limit,
          category_id = _ref.category_id,
          tags = _ref.tags,
          attributes = _ref.attributes,
          price_from = _ref.price_from,
          price_to = _ref.price_to,
          on_sale = _ref.on_sale;

      var filter = {
        ids: ids,
        sku: sku,
        tags: tags,
        on_sale: on_sale,
        search: null,
        category_id: category_id,
        price_from: price_from,
        price_to: price_to,
        sort: sort,
        fields: 'path,id,name,category_id,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags',
        limit: limit || 4,
        offset: 0
      };

      if (attributes && Array.isArray(attributes) && attributes.length > 0) {
        attributes.forEach(function (attr) {
          filter['attributes.' + attr.name] = attr.value;
        });
      }

      _api2.default.ajax.products.list(filter).then(function (_ref2) {
        var status = _ref2.status,
            json = _ref2.json;

        _this.setState({
          products: json.data
        });
      }).catch(function () {});
    };

    _this.state = {
      products: []
    };
    return _this;
  }

  _createClass(CustomProducts, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchProducts(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.fetchProducts(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          settings = _props.settings,
          addCartItem = _props.addCartItem,
          isCentered = _props.isCentered,
          className = _props.className,
          columnCountOnMobile = _props.columnCountOnMobile,
          columnCountOnTablet = _props.columnCountOnTablet,
          columnCountOnDesktop = _props.columnCountOnDesktop,
          columnCountOnWidescreen = _props.columnCountOnWidescreen,
          columnCountOnFullhd = _props.columnCountOnFullhd;


      return _react2.default.createElement(_productList2.default, {
        products: this.state.products,
        addCartItem: addCartItem,
        settings: settings,
        loadMoreProducts: null,
        hasMore: false,
        columnCountOnMobile: columnCountOnMobile,
        columnCountOnTablet: columnCountOnTablet,
        columnCountOnDesktop: columnCountOnDesktop,
        columnCountOnWidescreen: columnCountOnWidescreen,
        columnCountOnFullhd: columnCountOnFullhd,
        isCentered: isCentered,
        className: className
      });
    }
  }]);

  return CustomProducts;
}(_react2.default.Component);

exports.default = CustomProducts;