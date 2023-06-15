const { getConfig } = require('@shopmost/shopmost/src/lib/util/getConfig');

module.exports.getAdminTokenCookieId = () =>
  getConfig('jwt.adminCookieId', 'admin_token');
