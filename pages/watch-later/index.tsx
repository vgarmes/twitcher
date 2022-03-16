import { NextPage } from 'next';
import fetcher from '../../utils/fetcher';
import useSWR from 'swr';
import { IUser } from '../../types';

const WatchLater: NextPage<{}> = () => {
  const { data, error } = useSWR<IUser>('/api/user/me', fetcher);
  console.log(data);

  return <></>;
};

export default WatchLater;
