import useSWR, { Middleware, SWRHook } from 'swr';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth/core/types';

const fetcher = (url: string, config: any) =>
  axios.get(url, config).then((res) => res.data);

const authMiddleware: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, options) => {
    const { data: session } = useSession();
    const isAuthenticated = session && !session.error;
    const newKey = isAuthenticated ? key : null;
    const config = isAuthenticated
      ? {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Client-Id': `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
          },
        }
      : {};

    return useSWRNext([newKey, config], fetcher, options);
  };

export function useFollows() {
  const { data: session } = useSession();
  const url =
    'https://api.twitch.tv/helix/users/follows?' +
    new URLSearchParams({ from_id: (session?.user as User)?.id });

  return useSWR(url, fetcher, { use: [authMiddleware] });
}
