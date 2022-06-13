import { User } from 'next-auth';
import { prisma } from '../server/prisma';

const upsertUser = async (user: User) => {
  return prisma.user.upsert({
    where: {
      twitchId: user.id,
    },
    update: {},
    create: {
      twitchId: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });
};

export default upsertUser;
