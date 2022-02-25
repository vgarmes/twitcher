import useSWR from 'swr';
import { SWRResponse } from 'swr/dist/types';
import { IUser } from '../types';
import fetcher from '../utils/fetcher';

export const useGetUser: (userId: string) => SWRResponse<IUser, any> = (
  userId
) => {
  return useSWR('/api/user?user_id=' + userId, fetcher);
};
