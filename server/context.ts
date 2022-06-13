import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';

/* interface CreateContextOptions {
  session: Session | null;
}

 export async function createContextInner(_opts: CreateContextOptions) {
  return _opts;
}  */

//export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const req = opts?.req;
  const session = await getSession({ req });

  //return await createContextInner({ session });
  return { session };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
