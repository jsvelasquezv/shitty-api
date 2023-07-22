const fp = require('fastify-plugin');

const authPlugin = async (fastify, _options) => {
  fastify.addHook('onRequest', async (request, reply) => {
    const header = request.headers?.authorization;

    if (!header) {
      return reply.code(401).send('No authorization header provided');
    }

    const [type, token] = header.split(' ');

    if (type !== 'Basic' || !token) {
      return reply.code(401).send('Invalid token provided');
    }

    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = decodedToken.split(':');

    if (!username || !password) {
      return reply.code(401).send('Invalid token provided');
    }

    const client = await fastify.prisma.client.findFirst({
      where: { username, password },
    });

    if (!client) {
      return reply.code(401).send('Unauthorized');
    }
  });
};

module.exports = fp(authPlugin);
