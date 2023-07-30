const { todayBirthdays } = require('../modules/users');

async function usersRoutes(fastify) {
  fastify.get('/users/birthdays', async (_request, _reply) => {
    return todayBirthdays(fastify);
  });
}

module.exports = { usersRoutes };
