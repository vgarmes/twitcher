import { prisma } from '../../prisma';
import { createProtectedRouter } from '../../createRouter';
import { TRPCError } from '@trpc/server';
import { twitchEndpoints } from '../../../constants/twitchEndpoints';
import { Videos } from '../../../types';
import axios, { AxiosResponse } from 'axios';
import { getAuthHeaders } from '../../../utils/getAuthHeaders';
import { z } from 'zod';

export const userRouter = createProtectedRouter()
  .query('me', {
    async resolve({ ctx }) {
      const userId = ctx.session.user?.id;
      if (!userId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No user id',
        });
      }

      const userData = await prisma.user.findFirst({
        where: {
          twitchId: ctx.session?.user?.id,
        },
      });
      if (!userData) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${userId}'`,
        });
      }

      return userData;
    },
  })
  .mutation('add-video', {
    input: z.object({
      videoId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userId = ctx.session.user?.id;
      if (!userId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No user id',
        });
      }

      // until prisma supports MongoDB's $addToSet:

      const user = await prisma.user.findUnique({
        where: {
          twitchId: userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${userId}'`,
        });
      }

      const videos = new Set(user.watchLater);
      videos.add(input.videoId);

      return prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          watchLater: Array.from(videos),
        },
      });
    },
  });
