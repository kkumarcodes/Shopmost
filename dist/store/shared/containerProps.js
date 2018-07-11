'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps = exports.mapStateToProps = undefined;

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _jsonld = require('./lib/jsonld');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setQuery = function setQuery(history, query) {
  if (history && history.location) {
    var newLocation = history.location.pathname + "?" + _queryString2.default.stringify(query);
    history.push(newLocation);
  }
};

var mapStateToProps = exports.mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    state: state.app
  };
};

var mapDispatchToProps = exports.mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    addCartItem: function addCartItem(item) {
      dispatch((0, _actions.addCartItem)(item));
    },
    deleteCartItem: function deleteCartItem(item_id) {
      dispatch((0, _actions.deleteCartItem)(item_id));
    },
    updateCartItemQuantiry: function updateCartItemQuantiry(item_id, quantity) {
      dispatch((0, _actions.updateCartItemQuantiry)(item_id, quantity));
    },
    loadMoreProducts: function loadMoreProducts() {
      dispatch((0, _actions.fetchMoreProducts)());
    },
    setSearch: function setSearch(search) {
      var query = _queryString2.default.parse(ownProps.history.location.search);
      query.search = search;
      setQuery(ownProps.history, query);
    },
    setSort: function setSort(sort) {
      dispatch((0, _actions.setSort)(sort));
    },
    setPriceFromAndTo: function setPriceFromAndTo(priceFrom, priceTo) {
      var query = _queryString2.default.parse(ownProps.history.location.search);
      query.price_from = priceFrom;
      query.price_to = priceTo;
      setQuery(ownProps.history, query);
    },
    setPriceFrom: function setPriceFrom(priceFrom) {
      var query = _queryString2.default.parse(ownProps.history.location.search);
      query.price_from = priceFrom;
      setQuery(ownProps.history, query);
    },
    setPriceTo: function setPriceTo(priceTo) {
      var query = _queryString2.default.parse(ownProps.history.location.search);
      query.price_to = priceTo;
      setQuery(ownProps.history, query);
    },
    setFilterAttribute: function setFilterAttribute(name, value) {
      var query = _queryString2.default.parse(ownProps.history.location.search);
      var queryKey = 'attributes.' + name;

      if (query[queryKey]) {
        if (Array.isArray(query[queryKey])) {
          query[queryKey].push(value);
        } else {
          query[queryKey] = [query[queryKey], value];
        }
      } else {
        query[queryKey] = [value];
      }

      setQuery(ownProps.history, query);
    },
    unsetFilterAttribute: function unsetFilterAttribute(name, value) {
      var query = _queryString2.default.parse(ownProps.history.location.search);
      var queryKey = 'attributes.' + name;
      var values = query[queryKey];

      if (values) {
        if (Array.isArray(values)) {
          query[queryKey] = values.filter(function (v) {
            return v !== value;
          });
        } else {
          query[queryKey] = undefined;
        }
      }

      setQuery(ownProps.history, query);
    },
    setLocation: function setLocation(path) {
      ownProps.history.push(path);
    },
    goBack: function goBack() {
      if (ownProps.history.length > 0) {
        ownProps.history.goBack();
      }
    },
    getJSONLD: function getJSONLD(state) {
      return (0, _jsonld.getJSONLD)(state);
    }
  };
};