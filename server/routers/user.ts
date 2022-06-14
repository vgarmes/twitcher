import { prisma } from '../prisma';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createProtectedRouter, createRouter } from '../createRouter';
import { getToken } from 'next-auth/jwt';

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
