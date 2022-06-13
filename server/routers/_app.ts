import { createRouter } from '../createRouter';
import { userRouter } from './user';
import superjson from 'superjson';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('user.', userRouter);

export type AppRouter = typeof appRouter;
