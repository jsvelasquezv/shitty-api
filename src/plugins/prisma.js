const fp = require('fastify-plugin');
const { PrismaClient } = require('@prisma/client');

const prismaPlugin = async (fastify) => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async () => {
    await fastify.prisma.$disconnect();
  });
};

module.exports = fp(prismaPlugin);
