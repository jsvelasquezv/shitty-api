const fastify = require('fastify')({ logger: true });
const { exchangeRoutes } = require('./routes/exchange');
const { usersRoutes } = require('./routes/users');
const prismaPlugin = require('./plugins/prisma');
const authPlugin = require('./plugins/auth');

fastify.get('/', function (_request, reply) {
  reply.send({ hello: 'world' });
});

// Availiable for all
fastify.register(prismaPlugin);

// Scopping api key validation to only routes that need auth
fastify.register(async function authenticatedRoutes(childInstance) {
  childInstance.register(authPlugin);
  childInstance.register(exchangeRoutes);
  childInstance.register(usersRoutes);
});

fastify.listen({ port: 8080, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
