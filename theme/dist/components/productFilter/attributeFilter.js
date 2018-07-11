'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttributeValue = function (_React$Component) {
  _inherits(AttributeValue, _React$Component);

  function AttributeValue(props) {
    _classCallCheck(this, AttributeValue);

    var _this = _possibleConstructorReturn(this, (AttributeValue.__proto__ || Object.getPrototypeOf(AttributeValue)).call(this, props));

    _this.onChange = function (event) {
      var _this$props = _this.props,
          attributeName = _this$props.attributeName,
          valueName = _this$props.valueName,
          setFilterAttribute = _this$props.setFilterAttribute,
          unsetFilterAttribute = _this$props.unsetFilterAttribute;

      var checked = event.target.checked;

      _this.setState({ checked: checked });

      if (checked) {
        setFilterAttribute(attributeName, valueName);
      } else {
        unsetFilterAttribute(attributeName, valueName);
      }
    };

    _this.state = {
      checked: props.checked
    };
    return _this;
  }

  _createClass(AttributeValue, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.checked !== this.props.checked) {
        this.setState({ checked: nextProps.checked });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          valueName = _props.valueName,
          count = _props.count;

      var isDisabled = count === 0;
      var classChecked = this.state.checked ? "attribute-checked" : "";
      var classDisabled = isDisabled ? "attribute-disabled" : "";

      return _react2.default.createElement(
        'label',
        { className: classChecked + " " + classDisabled },
        _react2.default.createElement('input', { type: 'checkbox', disabled: isDisabled, onChange: this.onChange, checked: this.state.checked }),
        valueName
      );
    }
  }]);

  return AttributeValue;
}(_react2.default.Component);

var AttributeSet = function AttributeSet(_ref) {
  var attribute = _ref.attribute,
      setFilterAttribute = _ref.setFilterAttribute,
      unsetFilterAttribute = _ref.unsetFilterAttribute;

  var values = attribute.values.map(function (value, index) {
    return _react2.default.createElement(AttributeValue, {
      key: index,
      attributeName: attribute.name,
      valueName: value.name,
      checked: value.checked,
      count: value.count,
      setFilterAttribute: setFilterAttribute,
      unsetFilterAttribute: unsetFilterAttribute
    });
  });

  return _react2.default.createElement(
    'div',
    { className: 'attribute' },
    _react2.default.createElement(
      'div',
      { className: 'attribute-title' },
      attribute.name
    ),
    values
  );
};

var AttributeFilter = function AttributeFilter(_ref2) {
  var attributes = _ref2.attributes,
      setFilterAttribute = _ref2.setFilterAttribute,
      unsetFilterAttribute = _ref2.unsetFilterAttribute;

  var attributeSets = attributes.map(function (attribute, index) {
    return _react2.default.createElement(AttributeSet, {
      key: index,
      attribute: attribute,
      setFilterAttribute: setFilterAttribute,
      unsetFilterAttribute: unsetFilterAttribute
    });
  });

  return _react2.default.createElement(
    'div',
    { className: 'attribute-filter' },
    attributeSets
  );
};

exports.default = AttributeFilter;