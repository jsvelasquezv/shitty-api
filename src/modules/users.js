const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

async function updateUser() {}

async function todayBirthdays(fastify) {
  const currentDate = dayjs().utc().tz('America/Bogota');

  const usernames = await fastify.prisma.user.findMany({
    where: {
      bdDay: currentDate.date(),
      bdMonth: currentDate.month() + 1,
    },
    select: {
      username: true,
    },
  });

  return {
    users: usernames.map((user) => user.username),
  };
}

module.exports = { updateUser, todayBirthdays };
