import { NextPage } from 'next';
import fetcher from '../../utils/fetcher';
import useSWR from 'swr';
import { IUser } from '../../types';
import Layout from '../../components/layouts/article';
import { useEffect } from 'react';
import axios from 'axios';

const WatchLater: NextPage<{}> = () => {
  const { data, error } = useSWR<IUser>('/api/user/me', fetcher);
  useEffect(() => {
    axios.get(
      'http://localhost:3000/api/twitch/videos?id=1422590374&id=1424633272'
    );
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold pb-5">Watch later</h1>
    </Layout>
  );
};

export default WatchLater;
