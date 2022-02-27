import useSWR from 'swr';
import { SWRResponse } from 'swr/dist/types';
import { IUser } from '../types';
import fetcher from '../utils/fetcher';

export const useGetUser: (userId: string) => {
  user: any;
  isLoading: boolean;
  error: any;
} = (userId) => {
  const { data, error } = useSWR(`/api/user?user_id=${userId}`, fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    error: error,
  };
};
