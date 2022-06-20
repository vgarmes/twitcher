import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import { getServerSession, Session } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import {
  authOptions,
  authOptions as nextAuthOptions,
} from '../pages/api/auth/[...nextauth]';

/* interface CreateContextOptions {
  session: Session | null;
}

 export async function createContextInner(_opts: CreateContextOptions) {
  return _opts;
}  */

//export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const req = opts?.req;
  const res = opts?.res;
  const session = opts && (await getServerSession(opts, authOptions));

  //return await createContextInner({ session });
  return { req, res, session };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
