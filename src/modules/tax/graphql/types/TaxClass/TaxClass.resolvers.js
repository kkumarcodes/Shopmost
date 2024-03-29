const { select } = require('@bin/postgres-query-builder');
const { pool } = require('@lib/postgres/connection');
const { camelCase } = require('@lib/util/camelCase');
const { buildUrl } = require('@lib/router/buildUrl');

module.exports = {
  Query: {
    taxClasses: async () => {
      const taxClasses = await select()
        .from('tax_class')
        .orderBy('tax_class_id', 'DESC')
        .execute(pool);
      // Parse the provinces field into an array
      return taxClasses.map((row) => camelCase(row));
    },
    taxClass: async (_, { id }) => {
      const taxClass = await select()
        .from('tax_class')
        .where('uuid', '=', id)
        .load(pool);
      return camelCase(taxClass);
    }
  },
  TaxClass: {
    rates: async (parent) => {
      const query = select().from('tax_rate');
      query.where('tax_class_id', '=', parent.taxClassId);
      const rates = await query.execute(pool);
      return rates.map((row) => camelCase(row));
    },
    addRateApi: async ({ uuid }) => {
      return buildUrl('createTaxRate', { class_id: uuid });
    }
  },
  TaxRate: {
    updateApi: async ({ uuid }) => {
      return buildUrl('updateTaxRate', { id: uuid });
    },
    deleteApi: async ({ uuid }) => {
      return buildUrl('deleteTaxRate', { id: uuid });
    }
  }
};
