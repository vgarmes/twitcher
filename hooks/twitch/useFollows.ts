import axios, { AxiosRequestHeaders } from 'axios';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { twitchEndpoints } from '../../constants/twitchEndpoints';
import { TwitchUser } from '../../types';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

interface Follow {
  followed_at: string;
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_login: string;
  to_name: string;
}

interface Follows {
  data: Follow[];
  pagination: {
    cursor: string;
  };
  total: number;
}

const getFollowsById = async (userId: string, headers: AxiosRequestHeaders) => {
  const params = new URLSearchParams({ from_id: userId });
  const url = `${twitchEndpoints.follows}?${params}`;
  const { data } = await axios.get<Follows>(url, { headers });
  return data;
};

const getUsers = async (follows: Follows, headers: AxiosRequestHeaders) => {
  const params = follows.data
    .reduce((accum, follow) => accum + `id=${follow.to_id}&`, '')
    .slice(0, -1);
  const url = `${twitchEndpoints.users}?${params}`;
  const { data } = await axios.get<{ data: TwitchUser[] }>(url, {
    headers,
  });
  return {
    follows: data.data,
    total: follows.total,
    pagination: follows.pagination,
  };
};

const getFollows = async (session: Session | null) => {
  if (!session) return null;
  const headers = getAuthHeaders(session.accessToken);
  return getFollowsById(session.user.id, headers).then((follows) =>
    getUsers(follows, headers)
  );
};

export default function useFollows() {
  const { data: session } = useSession();
  return useQuery(['follows', session], () => getFollows(session), {
    enabled: !!session,
    keepPreviousData: true,
  });
}
