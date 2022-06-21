import { prisma } from '../../prisma';
import { createProtectedRouter } from '../../createRouter';
import { TRPCError } from '@trpc/server';
import { twitchEndpoints } from '../../../constants/twitchEndpoints';
import { Videos } from '../../../types';
import axios, { AxiosResponse } from 'axios';
import { getAuthHeaders } from '../../../utils/getAuthHeaders';

export const userRouter = createProtectedRouter().query('me', {
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
});
