const { getConfig } = require('@shopmost/shopmost/src/lib/util/getConfig');

module.exports = {
  Setting: {
    allowedCountries: (setting) => {
      const allowedCountries = setting.find(
        (s) => s.name === 'allowedCountries'
      );
      if (allowedCountries && allowedCountries.value) {
        return JSON.parse(allowedCountries.value);
      } else {
        return ['US'];
      }
    },
    weightUnit: () => {
      return getConfig('shop.weightUnit', 'kg');
    }
  }
};