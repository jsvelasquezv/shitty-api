const fastify = require('fastify')({ logger: true });
const { exchangeRoutes } = require('./routes/exchange');

fastify.get('/', function (_request, reply) {
  reply.send({ hello: 'world' });
});

fastify.register(exchangeRoutes);

fastify.listen({ port: 8080, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
