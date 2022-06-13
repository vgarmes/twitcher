import { prisma } from '../prisma';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createProtectedRouter, createRouter } from '../createRouter';
import { resolve } from 'path';

export const userRouter = createProtectedRouter().query('me', {
  async resolve({ ctx }) {
    return prisma.user.findFirst({
      where: {
        twitchId: ctx.session.user.id,
      },
    });
  },
});
