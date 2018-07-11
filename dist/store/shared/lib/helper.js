'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatNumber = exports.formatNumber = function formatNumber() {
  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var settings = arguments[1];

  var x = 3;

  var re = '\\d(?=(\\d{' + x + '})+' + (settings.decimal_number > 0 ? '\\D' : '$') + ')';

  var num = (number || 0).toFixed(Math.max(0, ~~settings.decimal_number));

  return (settings.decimal_separator ? num.replace('.', settings.decimal_separator) : num).replace(new RegExp(re, 'g'), '$&' + settings.thousand_separator);
};

var amountPattern = '{amount}';
var formatCurrency = exports.formatCurrency = function formatCurrency() {
  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var settings = arguments[1];

  return settings.currency_format.replace(amountPattern, formatNumber(number, settings));
};

var getThumbnailUrl = exports.getThumbnailUrl = function getThumbnailUrl(originalUrl, width) {
  if (originalUrl && originalUrl.length > 0) {
    var pos = originalUrl.lastIndexOf('/');
    var thumbnailUrl = originalUrl.substring(0, pos) + ('/' + width + '/') + originalUrl.substring(pos + 1);
    return thumbnailUrl;
  } else {
    return '';
  }
};

var getParentIds = exports.getParentIds = function getParentIds(categories, categoryId) {
  var parentIds = [];
  var parentExists = false;

  do {
    var category = categories.find(function (item) {
      return item.id === categoryId;
    });
    parentExists = category && category.parent_id;
    if (parentExists) {
      parentIds.push(category.parent_id);
      categoryId = category.parent_id;
    }
  } while (parentExists);

  return parentIds;
};