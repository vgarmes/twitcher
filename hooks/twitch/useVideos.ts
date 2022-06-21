import axios, { AxiosRequestHeaders } from 'axios';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { twitchEndpoints } from '../../constants/twitchEndpoints';
import { Videos } from '../../types';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

const getVideosById = async (
  session: Session | null,
  id?: string | string[]
) => {
  if (!session) {
    throw new Error('Unauthenticated');
  }
  if (!id) {
    throw new Error('Missing video id');
  }
  const params =
    typeof id === 'string'
      ? new URLSearchParams({ id })
      : id
          .reduce((accum, singleId) => accum + `id=${singleId}&`, '')
          .slice(0, -1);
  const headers = getAuthHeaders(session?.accessToken);
  const url = `${twitchEndpoints.videos}?${params}`;
  const { data } = await axios.get<Videos>(url, { headers });
  return data;
};

const getVideosByUserId = async (
  session: Session | null,
  userId?: string | string[]
) => {
  if (!session) {
    throw new Error('Unauthenticated');
  }
  if (!userId || Array.isArray(userId)) {
    throw new Error('Invalid user_id');
  }
  const headers = getAuthHeaders(session.accessToken);
  const params = new URLSearchParams({ user_id: userId });
  const url = `${twitchEndpoints.videos}?${params}`;
  const { data } = await axios.get<Videos>(url, { headers });
  return data;
};

export function useUserVideos(
  session: Session | null,
  userId?: string | string[]
) {
  return useQuery(
    ['user-videos', userId],
    () => getVideosByUserId(session, userId),
    {
      enabled: !!session,
      keepPreviousData: true,
    }
  );
}

export function useVideos(session: Session | null, id?: string | string[]) {
  return useQuery(['videos', id], () => getVideosById(session, id), {
    enabled: !!session && !!id?.length,
    keepPreviousData: true,
  });
}
