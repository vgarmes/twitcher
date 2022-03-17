import { NextPage } from 'next';
import fetcher from '../../utils/fetcher';
import useSWR, { useSWRConfig } from 'swr';
import { IUser } from '../../types';
import Layout from '../../components/layouts/article';
import { useEffect } from 'react';
import axios from 'axios';

const WatchLater: NextPage<{}> = () => {
  const { data, error } = useSWR('/api/me/watchlater', fetcher);
  console.log(data);
  return (
    <Layout>
      <h1 className="text-3xl font-bold pb-5">Watch later</h1>
    </Layout>
  );
};

export default WatchLater;
