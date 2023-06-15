const { camelCase } = require('@shopmost/shopmost/src/lib/util/camelCase');
const { select } = require('@shopmost/postgres-query-builder');

module.exports = {
  Query: {
    comments: async (root, { productId }, { pool }) => {
      const comments = await select()
        .from('product_comment')
        .where('product_id', '=', productId)
        .execute(pool);

      return comments.map(comment => camelCase(comment));
    }
  }
}