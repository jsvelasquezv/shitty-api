const { getExchange } = require('../modules/exchange');

async function exchangeRoutes(fastify) {
  fastify.get('/exchange', async (_request, _reply) => {
    return getExchange();
  });
}

module.exports = { exchangeRoutes };
