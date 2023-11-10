const { getConfig } = require('@lib/util/getConfig');

module.exports = {
  Setting: {
    displayCatalogPriceIncludeTax: () => getConfig(
        'pricing.tax.display_catalog_price_including_tax',
        false
      ),
    displayCheckoutPriceIncludeTax: () => getConfig(
        'pricing.tax.display_checkout_price_including_tax',
        false
      )
  }
};
