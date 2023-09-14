const { insert } = require('../../bin/postgres-query-builder');
const { pool } = require('../../lib/postgres/connection');

module.exports.emit = async function emit(name, data) {
  await insert('event')
    .given({
      name,
      data
    })
    .execute(pool);
};
