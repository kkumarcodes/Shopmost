const { insert } = require('@shopmost/postgres-query-builder');

module.exports = async (request, response, delegate) => {
  const connection = await delegate.getConnection;
  const result = await insert('coupon').given(request.body).execute(connection);

  return result;
};
