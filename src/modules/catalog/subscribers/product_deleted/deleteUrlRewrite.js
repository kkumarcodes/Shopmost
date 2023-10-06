const { pool } = require('@lib/postgres/connection');
const { execute } = require('@bin/postgres-query-builder');

module.exports = async function buildUrlReWrite(data) {
  const productUuid = data.uuid;

  // Delete the url rewrite for the product
  await execute(
    pool,
    `DELETE FROM url_rewrite WHERE entity_uuid = ${productUuid} AND entity_type = 'product'`
  );
};
