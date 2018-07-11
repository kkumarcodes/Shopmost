'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DISQUS_CONFIG = ['shortname', 'identifier', 'title', 'url', 'category_id', 'onNewComment'];
var __disqusAdded = false;

function copyProps(context, props) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  Object.keys(props).forEach(function (prop) {
    context[prefix + prop] = props[prop];
  });

  if (typeof props.onNewComment === 'function') {
    context[prefix + 'config'] = function config() {
      this.callbacks.onNewComment = [function handleNewComment(comment) {
        props.onNewComment(comment);
      }];
    };
  }
}

var Disqus = function (_React$PureComponent) {
  _inherits(Disqus, _React$PureComponent);

  function Disqus(props) {
    _classCallCheck(this, Disqus);

    return _possibleConstructorReturn(this, (Disqus.__proto__ || Object.getPrototypeOf(Disqus)).call(this, props));
  }

  _createClass(Disqus, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadDisqus();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.loadDisqus();
    }
  }, {
    key: 'addDisqusScript',
    value: function addDisqusScript() {
      if (__disqusAdded) {
        return;
      }

      var child = this.disqus = document.createElement('script');
      var parent = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];

      child.async = true;
      child.type = 'text/javascript';
      child.src = '//' + this.props.shortname + '.disqus.com/embed.js';

      parent.appendChild(child);
      __disqusAdded = true;
    }
  }, {
    key: 'loadDisqus',
    value: function loadDisqus() {
      var _this2 = this;

      var props = {};

      // Extract Disqus props that were supplied to this component
      DISQUS_CONFIG.forEach(function (prop) {
        if (!!_this2.props[prop]) {
          props[prop] = _this2.props[prop];
        }
      });

      // Always set URL
      if (!props.url || !props.url.length) {
        props.url = window.location.href;
      }

      // If Disqus has already been added, reset it
      if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({
          reload: true,
          config: function config() {
            copyProps(this.page, props);

            // Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
            this.page.url = this.page.url.replace(/#/, '') + '#!newthread';
          }
        });
      } else {
        // Otherwise add Disqus to the page
        copyProps(window, props, 'disqus_');
        this.addDisqusScript();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { id: 'disqus_thread' });
    }
  }]);

  return Disqus;
}(_react2.default.PureComponent);

exports.default = Disqus;