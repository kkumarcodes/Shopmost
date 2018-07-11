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

var DiscountCountdown = function (_React$Component) {
  _inherits(DiscountCountdown, _React$Component);

  function DiscountCountdown(props) {
    _classCallCheck(this, DiscountCountdown);

    var _this = _possibleConstructorReturn(this, (DiscountCountdown.__proto__ || Object.getPrototypeOf(DiscountCountdown)).call(this, props));

    _this.tick = function () {
      var dateNow = new Date();
      var dateTo = new Date(_this.props.product.date_sale_to);
      var diff = Math.abs(Math.floor((dateTo.getTime() - dateNow.getTime()) / 1000));

      _this.setState({
        diff: diff
      });
    };

    _this.pad = function (num) {
      return num < 10 ? '0' + num : num;
    };

    _this.state = {
      timer: null,
      diff: null
    };
    return _this;
  }

  _createClass(DiscountCountdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var timer = setInterval(this.tick, 1000);
      this.setState({
        timer: timer
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.state.timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var product = this.props.product;
      var diff = this.state.diff;


      if (product) {
        var days = Math.floor(diff / (24 * 60 * 60));
        var leftSec = diff - days * 24 * 60 * 60;

        var hrs = Math.floor(leftSec / (60 * 60));
        leftSec = leftSec - hrs * 60 * 60;

        var min = Math.floor(leftSec / 60);
        leftSec = leftSec - min * 60;

        return _react2.default.createElement(
          'div',
          { className: 'discount-countdown' },
          _react2.default.createElement(
            'div',
            { className: 'discount-title' },
            _settings.text.saleEnds,
            ':'
          ),
          _react2.default.createElement(
            'div',
            { className: 'columns is-mobile has-text-centered discount-numbers is-gapless', style: { margin: '8px 0' } },
            _react2.default.createElement(
              'div',
              { className: 'column is-2' },
              this.pad(days)
            ),
            _react2.default.createElement(
              'div',
              { className: 'column is-1' },
              ':'
            ),
            _react2.default.createElement(
              'div',
              { className: 'column is-2' },
              this.pad(hrs)
            ),
            _react2.default.createElement(
              'div',
              { className: 'column is-1' },
              ':'
            ),
            _react2.default.createElement(
              'div',
              { className: 'column is-2' },
              this.pad(min)
            ),
            _react2.default.createElement(
              'div',
              { className: 'column is-1' },
              ':'
            ),
            _react2.default.createElement(
              'div',
              { className: 'column is-2' },
              this.pad(leftSec)
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'columns is-mobile has-text-centered discount-labels is-gapless' },
            _react2.default.createElement(
              'div',
              { className: 'column is-2' },
              _settings.text.days
            ),
            _react2.default.createElement('div', { className: 'column is-1' }),
            _react2.default.createElement(
              'div',
              { className: 'column is-2' },
              _settings.text.hours
            ),
            _react2.default.createElement('div', { className: 'column is-1' }),
            _react2.default.createElement(
              'div',
              { className: 'column is-2' },
              _settings.text.minutes
            ),
            _react2.default.createElement('div', { className: 'column is-1' }),
            _react2.default.createElement(
              'div',
              { className: 'column is-2' },
              _settings.text.seconds
            )
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return DiscountCountdown;
}(_react2.default.Component);

exports.default = DiscountCountdown;