import useSWR, { SWRResponse } from 'swr';
import { FollowedUsers, Videos } from '../types';
import fetcher from '../utils/fetcher';

export const useFollows: () => SWRResponse<FollowedUsers, any> = () => {
  return useSWR('/api/twitch/follows', fetcher);
};

export const useVideosByUserId: (userId: string) => SWRResponse<Videos, any> = (
  userId
) => {
  return useSWR('/api/twitch/videos?user_id=' + userId, fetcher);
};
