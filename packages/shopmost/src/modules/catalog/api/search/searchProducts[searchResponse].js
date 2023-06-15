const { select } = require('@shopmost/postgres-query-builder');
const { pool } = require('@shopmost/shopmost/src/lib/postgres/connection');
const { buildUrl } = require('@shopmost/shopmost/src/lib/router/buildUrl');
const { assign } = require('@shopmost/shopmost/src/lib/util/assign');

module.exports = async (request, response) => {
  const { keyword } = request.query;

  // Search products
  const query = select('product_id', 'sku')
    .select('d.name', 'name')
    .from('product', 'p');
  query
    .leftJoin('product_description', 'd')
    .on('p.product_id', '=', 'd.product_description_product_id');
  query
    .where('p.sku', 'LIKE', `%${keyword}%`)
    .or('d.name', 'LIKE', `%${keyword}%`)
    .or('d.description', 'LIKE', `%${keyword}%`);
  query.limit(0, 20);
  const products = (await query.execute(pool)).map((p) => ({
    name: p.name,
    url: buildUrl('productEdit', { id: p.product_id }),
    description: `Sku ${p.sku}`
  }));
  if (products.length > 0) {
    response.payload = response.payload || [];
    assign(response.payload, [{ name: 'Products', items: products }]);
  }
};
