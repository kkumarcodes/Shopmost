const { start } = require('@shopmost/shopmost/bin/lib/startUp');
const { watch } = require('@shopmost/shopmost/bin/lib/watch/watch');
const { watchMF } = require('@shopmost/shopmost/bin/lib/watch/watchMF');
const { watchPage } = require('@shopmost/shopmost/bin/lib/watch/watchPage');
const { watchSchema } = require('@shopmost/shopmost/bin/lib/watch/watchSchema');

(async () => {
  await start(() => {
    watch([watchPage, watchSchema, watchMF]);
  });
})();
