import { Context } from './context';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';

export function createRouter() {
  return trpc.router<Context>();
}

export function createProtectedRouter() {
  return trpc.router<Context>().middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    // infers that `session` is non-nullable to downstream procedures
    return next({ ctx: { ...ctx, token: ctx.session } });
  });
}
