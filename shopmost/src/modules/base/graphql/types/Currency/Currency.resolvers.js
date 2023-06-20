const { currencies } = require('@shopmost/shopmost/src/lib/locale/currencies');

module.exports = {
  Query: {
    currencies: () => currencies
  }
};
