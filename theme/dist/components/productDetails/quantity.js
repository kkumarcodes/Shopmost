'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fragment = _react2.default.Fragment;

var Quantity = function (_React$PureComponent) {
  _inherits(Quantity, _React$PureComponent);

  function Quantity(props) {
    _classCallCheck(this, Quantity);

    var _this = _possibleConstructorReturn(this, (Quantity.__proto__ || Object.getPrototypeOf(Quantity)).call(this, props));

    _this.handleChange = function (event) {
      _this.setQuantity(event.target.value);
    };

    _this.setQuantity = function (quantity) {
      var intQuantity = parseInt(quantity);
      if (intQuantity > 0 && intQuantity <= _this.props.maxQuantity) {
        _this.setState({ quantity: intQuantity });
        _this.props.onChange(intQuantity);
      }
    };

    _this.increment = function () {
      var newQuantity = _this.state.quantity + 1;
      _this.setQuantity(newQuantity);
    };

    _this.decrement = function () {
      var newQuantity = _this.state.quantity - 1;
      _this.setQuantity(newQuantity);
    };

    _this.state = {
      quantity: 1
    };
    return _this;
  }

  _createClass(Quantity, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.quantity > nextProps.maxQuantity) {
        this.setQuantity(nextProps.maxQuantity);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var maxQuantity = this.props.maxQuantity;
      var quantity = this.state.quantity;

      var disabled = maxQuantity === 0;
      var value = disabled ? 0 : quantity;

      return _react2.default.createElement(
        Fragment,
        null,
        _react2.default.createElement(
          'div',
          null,
          _settings.text.qty
        ),
        _react2.default.createElement(
          'div',
          { className: 'product-quantity' },
          _react2.default.createElement('a', { className: 'decrement', onClick: this.decrement }),
          _react2.default.createElement('input', { value: value, onChange: this.handleChange, maxLength: '3', type: 'number', pattern: '\\d*', disabled: disabled }),
          _react2.default.createElement('a', { className: 'increment', onClick: this.increment })
        )
      );
    }
  }]);

  return Quantity;
}(_react2.default.PureComponent);

exports.default = Quantity;