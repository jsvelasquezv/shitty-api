const { getExchange } = require('../modules/exchange');

async function exchangeRoutes(fastify, _options) {
  fastify.get('/exchange', async (_request, _reply) => {
    return getExchange();
  });
}

module.exports = { exchangeRoutes };
