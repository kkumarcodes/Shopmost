const { buildUrl } = require('@shopmost/shopmost/src/lib/router/buildUrl');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');
const { getSetting } = require('../../../../setting/services/setting');

module.exports = async (request, response, delegate, next) => {
  setContextValue(request, 'pageInfo', {
    title: await getSetting('storeName', 'ShopMost'),
    description: await getSetting(
      'storeDescription',
      'An e-commerce platform with Node and MySQL'
    ),
    url: buildUrl('homepage')
  });

  next();
};
