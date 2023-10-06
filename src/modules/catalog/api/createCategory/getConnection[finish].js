const { startTransaction } = require('@bin/postgres-query-builder');
const {
  getConnection
} = require('@lib/postgres/connection');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response) => {
  const connection = await getConnection();
  await startTransaction(connection);

  return connection;
};
