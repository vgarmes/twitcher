import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { Follows, TwitchUser, Videos } from '../types';
import fetcher from '../utils/fetcher';
import getAppToken from '../utils/getAppToken';
import { getAuthHeaders } from '../utils/getAuthHeaders';

export const useGetFollows = () => {
  const { data: session } = useSession();

  const headers = getAuthHeaders(session?.accessToken as string);

  const followsUrl =
    'https://api.twitch.tv/helix/users/follows?' +
    new URLSearchParams({ from_id: (session?.user as User)?.id });

  const { data: follows, error: followsError } = useSWR<Follows>(
    session ? followsUrl : null,
    () => fetcher(followsUrl, { headers })
  );

  const queryParams = follows?.data.reduce(
    (accum, follow) => accum + `id=${follow.to_id}&`,
    ''
  );

  const usersUrl = 'https://api.twitch.tv/helix/users?' + queryParams;
  const { data: users, error: usersError } = useSWR<{ data: TwitchUser[] }>(
    follows ? usersUrl : null,
    () => fetcher(usersUrl, { headers })
  );

  return {
    data:
      users && follows
        ? {
            follows: users.data,
            total: follows.total,
            pagination: follows.pagination,
          }
        : undefined,
    isLoading: !users && !followsError && !usersError,
    error: followsError || usersError,
  };
};

export const useGetVideos = (userId: string) => {
  const { data: session } = useSession();

  const headers = getAuthHeaders(session?.accessToken as string);
  const url =
    'https://api.twitch.tv/helix/videos?' +
    new URLSearchParams({ user_id: userId });

  const { data, error } = useSWR<Videos, any>(
    session?.accessToken ? url : null,
    () => fetcher(url, { headers })
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
};

export const getTopGames = async () => {
  const appToken = await getAppToken();
  const headers = getAuthHeaders(appToken?.accessToken as string);
  const resp = await fetcher('https://api.twitch.tv/helix/games/top', {
    headers,
  });
  console.log(resp);
  return resp.data;
};
