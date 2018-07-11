'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('../../lib/api');

var _api2 = _interopRequireDefault(_api);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomPageList = function (_React$Component) {
  _inherits(CustomPageList, _React$Component);

  function CustomPageList(props) {
    _classCallCheck(this, CustomPageList);

    var _this = _possibleConstructorReturn(this, (CustomPageList.__proto__ || Object.getPrototypeOf(CustomPageList)).call(this, props));

    _this.fetchData = function (_ref) {
      var tags = _ref.tags,
          sort = _ref.sort;

      var filter = {
        tags: tags,
        sort: sort
      };

      _api2.default.ajax.pages.list(filter).then(function (_ref2) {
        var status = _ref2.status,
            json = _ref2.json;

        _this.setState({
          pages: json
        });
      });
    };

    _this.state = {
      pages: []
    };
    return _this;
  }

  _createClass(CustomPageList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchData(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.fetchData(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var pages = this.state.pages;

      return _react2.default.createElement(_list2.default, { pages: pages });
    }
  }]);

  return CustomPageList;
}(_react2.default.Component);

exports.default = CustomPageList;