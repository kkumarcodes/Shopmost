const { getConfig } = require('@shopmost/shopmost/src/lib/util/getConfig');

module.exports.getTokenCookieId = () => getConfig('jwt.cookieId', 'token');
