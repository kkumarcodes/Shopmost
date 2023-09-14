const { insert } = require('../../../../bin/postgres-query-builder');

module.exports = async (request, response, delegate) => {
  const connection = await delegate.getConnection;
  const data = request.body;
  const result = await insert('collection').given(data).execute(connection);
  return result;
};
