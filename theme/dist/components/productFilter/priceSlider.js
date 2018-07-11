'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _rcSlider = require('rc-slider');

var _settings = require('../../lib/settings');

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PriceSlider = function (_React$Component) {
  _inherits(PriceSlider, _React$Component);

  function PriceSlider(props) {
    _classCallCheck(this, PriceSlider);

    var _this = _possibleConstructorReturn(this, (PriceSlider.__proto__ || Object.getPrototypeOf(PriceSlider)).call(this, props));

    _this.setValues = function (values) {
      if (Array.isArray(values) && values.length === 2) {
        _this.setState({
          minValue: values[0],
          maxValue: values[1]
        });
      }
    };

    _this.state = {
      minValue: props.minValue > 0 ? props.minValue : props.minPrice,
      maxValue: props.maxValue > 0 ? props.maxValue : props.maxPrice
    };
    return _this;
  }

  _createClass(PriceSlider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.minPrice !== this.props.minPrice || nextProps.maxPrice !== this.props.maxPrice) {
        this.setState({
          minValue: nextProps.minPrice,
          maxValue: nextProps.maxPrice
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          minPrice = _props.minPrice,
          maxPrice = _props.maxPrice,
          setPriceFromAndTo = _props.setPriceFromAndTo,
          settings = _props.settings;


      return _react2.default.createElement(
        'div',
        { className: 'price-filter' },
        _react2.default.createElement(
          'div',
          { className: 'attribute-title' },
          _settings.text.price
        ),
        _react2.default.createElement(_rcSlider.Range, {
          min: minPrice,
          max: maxPrice,
          value: [this.state.minValue, this.state.maxValue],
          disabled: maxPrice === 0,
          className: 'price-filter-range',
          onAfterChange: function onAfterChange(values) {
            setPriceFromAndTo.apply(undefined, _toConsumableArray(values));
          },
          onChange: this.setValues
        }),
        _react2.default.createElement(
          'div',
          { className: 'columns is-mobile is-gapless price-filter-values' },
          _react2.default.createElement(
            'div',
            { className: 'column has-text-left' },
            helper.formatCurrency(this.state.minValue, settings)
          ),
          _react2.default.createElement(
            'div',
            { className: 'column has-text-right' },
            helper.formatCurrency(this.state.maxValue, settings)
          )
        )
      );
    }
  }]);

  return PriceSlider;
}(_react2.default.Component);

exports.default = PriceSlider;