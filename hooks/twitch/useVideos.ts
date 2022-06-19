import axios, { AxiosRequestHeaders } from 'axios';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { twitchEndpoints } from '../../constants/twitchEndpoints';
import { Videos } from '../../types';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

const getVideosById = async (id?: string | string[]) => {
  if (!id) {
    throw new Error('Missing video id');
  }
  const params =
    typeof id === 'string'
      ? new URLSearchParams({ id })
      : id
          .reduce((accum, singleId) => accum + `id=${singleId}&`, '')
          .slice(0, -1);
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

export default function useUserVideos(userId?: string | string[]) {
  const { data: session } = useSession();
  return useQuery(
    ['videos', session],
    () => getVideosByUserId(session, userId),
    {
      enabled: !!session,
      keepPreviousData: true,
    }
  );
}
