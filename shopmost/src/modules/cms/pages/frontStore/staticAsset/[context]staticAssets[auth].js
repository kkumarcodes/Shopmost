const staticMiddleware = require('@shopmost/shopmost/src/lib/middlewares/static');

module.exports = (request, response, stack, next) => {
  staticMiddleware(request, response, next);
};
