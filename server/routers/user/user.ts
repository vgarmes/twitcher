import { prisma } from '../../prisma';
import { createProtectedRouter } from '../../createRouter';

export const userRouter = createProtectedRouter()
  .query('me', {
    async resolve({ ctx }) {
      return prisma.user.findFirst({
        where: {
          twitchId: ctx.token.user.id,
        },
      });
    },
  })
  .query('follows', {
    async resolve({ ctx }) {
      //
    },
  });
