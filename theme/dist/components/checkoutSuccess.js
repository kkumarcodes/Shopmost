'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../lib/settings');

var _helper = require('../lib/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCheckoutField = function getCheckoutField(checkoutFields, fieldName) {
  if (checkoutFields && checkoutFields.length > 0) {
    return checkoutFields.find(function (f) {
      return f.name === fieldName && f.status !== 'hidden';
    });
  } else {
    return null;
  }
};

var MobileField = function MobileField(_ref) {
  var order = _ref.order,
      checkoutFields = _ref.checkoutFields;

  var checkoutField = getCheckoutField(checkoutFields, 'mobile');
  return checkoutField && order.mobile !== '' ? _react2.default.createElement(ShippingFieldDiv, { label: helper.getCheckoutFieldLabel(checkoutField), value: order.mobile }) : null;
};

var CityField = function CityField(_ref2) {
  var order = _ref2.order,
      checkoutFields = _ref2.checkoutFields;

  var checkoutField = getCheckoutField(checkoutFields, 'city');
  return checkoutField && order.shipping_address.city !== '' ? _react2.default.createElement(ShippingFieldDiv, { label: helper.getCheckoutFieldLabel(checkoutField), value: order.shipping_address.city }) : null;
};

var CommentsField = function CommentsField(_ref3) {
  var order = _ref3.order,
      checkoutFields = _ref3.checkoutFields;

  var checkoutField = getCheckoutField(checkoutFields, 'comments');
  return checkoutField && order.comments !== '' ? _react2.default.createElement(ShippingFieldDiv, { label: helper.getCheckoutFieldLabel(checkoutField), value: order.comments }) : null;
};

var ShippingFields = function ShippingFields(_ref4) {
  var order = _ref4.order,
      shippingMethod = _ref4.shippingMethod;

  var shippingFields = null;
  if (shippingMethod && shippingMethod.fields && shippingMethod.fields.length > 0) {
    shippingFields = shippingMethod.fields.map(function (field, index) {
      var fieldLabel = helper.getShippingFieldLabel(field);
      var fieldValue = order.shipping_address[field.key];

      return _react2.default.createElement(ShippingFieldDiv, { key: index, label: fieldLabel, value: fieldValue });
    });
  }

  return _react2.default.createElement(
    'div',
    null,
    shippingFields
  );
};

var ShippingFieldDiv = function ShippingFieldDiv(_ref5) {
  var label = _ref5.label,
      value = _ref5.value;
  return _react2.default.createElement(
    'div',
    { className: 'shipping-field' },
    _react2.default.createElement(
      'label',
      null,
      label,
      ': '
    ),
    value
  );
};

var OrderItem = function OrderItem(_ref6) {
  var item = _ref6.item,
      settings = _ref6.settings;
  return _react2.default.createElement(
    'div',
    { className: 'columns is-mobile is-gapless checkout-success-row' },
    _react2.default.createElement(
      'div',
      { className: 'column is-6' },
      item.name,
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'span',
        null,
        item.variant_name
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'column is-2 has-text-right' },
      helper.formatCurrency(item.price, settings)
    ),
    _react2.default.createElement(
      'div',
      { className: 'column is-2 has-text-centered' },
      item.quantity
    ),
    _react2.default.createElement(
      'div',
      { className: 'column is-2 has-text-right' },
      helper.formatCurrency(item.price_total, settings)
    )
  );
};

var OrderItems = function OrderItems(_ref7) {
  var items = _ref7.items,
      settings = _ref7.settings;

  if (items && items.length > 0) {
    var rows = items.map(function (item, index) {
      return _react2.default.createElement(OrderItem, { key: index, item: item, settings: settings });
    });
    return _react2.default.createElement(
      'div',
      null,
      rows
    );
  } else {
    return null;
  }
};

var CheckoutSuccess = function CheckoutSuccess(_ref8) {
  var order = _ref8.order,
      settings = _ref8.settings,
      pageDetails = _ref8.pageDetails,
      shippingMethod = _ref8.shippingMethod,
      checkoutFields = _ref8.checkoutFields;

  if (order && order.items && order.items.length > 0) {
    return _react2.default.createElement(
      'div',
      { className: 'checkout-success-details' },
      _react2.default.createElement(
        'h1',
        { className: 'checkout-success-title' },
        _react2.default.createElement('img', { src: '/assets/images/success.svg' }),
        _react2.default.createElement('br', null),
        _settings.text.checkoutSuccessTitle
      ),
      _react2.default.createElement('div', { dangerouslySetInnerHTML: {
          __html: pageDetails.content
        } }),
      _react2.default.createElement('hr', null),
      _react2.default.createElement(
        'div',
        { className: 'columns', style: { marginBottom: '3rem' } },
        _react2.default.createElement(
          'div',
          { className: 'column is-6' },
          _react2.default.createElement(
            'b',
            null,
            _settings.text.shipping
          ),
          _react2.default.createElement(MobileField, { order: order, checkoutFields: checkoutFields }),
          _react2.default.createElement(CityField, { order: order, checkoutFields: checkoutFields }),
          _react2.default.createElement(ShippingFields, { order: order, shippingMethod: shippingMethod }),
          _react2.default.createElement(CommentsField, { order: order, checkoutFields: checkoutFields })
        ),
        _react2.default.createElement(
          'div',
          { className: 'column is-6' },
          _react2.default.createElement(
            'b',
            null,
            _settings.text.orderNumber
          ),
          ': ',
          order.number,
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'b',
            null,
            _settings.text.shippingMethod
          ),
          ': ',
          order.shipping_method,
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'b',
            null,
            _settings.text.paymentMethod
          ),
          ': ',
          order.payment_method,
          _react2.default.createElement('br', null)
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'columns is-mobile is-gapless checkout-success-row' },
        _react2.default.createElement(
          'div',
          { className: 'column is-6' },
          _react2.default.createElement(
            'b',
            null,
            _settings.text.productName
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'column is-2 has-text-right' },
          _react2.default.createElement(
            'b',
            null,
            _settings.text.price
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'column is-2 has-text-centered' },
          _react2.default.createElement(
            'b',
            null,
            _settings.text.qty
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'column is-2 has-text-right' },
          _react2.default.createElement(
            'b',
            null,
            _settings.text.total
          )
        )
      ),
      _react2.default.createElement(OrderItems, { items: order.items, settings: settings }),
      _react2.default.createElement(
        'div',
        { className: 'columns' },
        _react2.default.createElement(
          'div',
          { className: 'column is-offset-7 checkout-success-totals' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              null,
              _settings.text.subtotal,
              ':'
            ),
            _react2.default.createElement(
              'span',
              null,
              helper.formatCurrency(order.subtotal, settings)
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              null,
              _settings.text.shipping,
              ':'
            ),
            _react2.default.createElement(
              'span',
              null,
              helper.formatCurrency(order.shipping_total, settings)
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'b',
              null,
              _settings.text.grandTotal,
              ':'
            ),
            _react2.default.createElement(
              'b',
              null,
              helper.formatCurrency(order.grand_total, settings)
            )
          )
        )
      )
    );
  } else {
    return _react2.default.createElement(
      'div',
      { className: 'has-text-centered' },
      _settings.text.cartEmpty
    );
  }
};

exports.default = CheckoutSuccess;