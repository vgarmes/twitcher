import { twitchEndpoints } from '../../../../constants/twitchEndpoints';

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

const getFollows = async (headers: HeadersInit, userId: string) => {
  const params = new URLSearchParams({ from_id: userId });
  const url = `${twitchEndpoints.follows}?${params}`;

  const follows = await fetch(url, { headers });
};
