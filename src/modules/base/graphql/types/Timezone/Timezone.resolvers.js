const { timezones } = require('@shopmost/shopmost/src/lib/locale/timezones');

module.exports = {
  Query: {
    timezones: () => timezones
  }
};
