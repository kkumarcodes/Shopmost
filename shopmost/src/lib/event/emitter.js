const { select, insert } = require('@shopmost/postgres-query-builder');
const { pool } = require('@shopmost/shopmost/src/lib/postgres/connection');

module.exports.emit = async function emit(name, data) {
  await insert('event')
    .given({
      name,
      data
    })
    .execute(pool);
};
