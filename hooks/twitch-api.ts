import useSWR, { SWRResponse } from 'swr';
import axios from 'axios';
import { FollowedUsers } from '../types';

const fetcher = (url: string, config: any) =>
  axios.get(url, config).then((res) => res.data);

export const useFollows: () => SWRResponse<FollowedUsers, any> = () => {
  return useSWR('/api/twitch/follows', fetcher);
};

export const useVideosByUserId = (userId: string) => {
  return useSWR('/api/twitch/videos?user_id=' + userId, fetcher);
};
