import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Layout from '@/layouts/article';

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    const url =
      'https://api.twitch.tv/helix/videos?' +
      new URLSearchParams({ id: '1288976401' });

    const config = {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Client-Id': `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
      },
    };
    axios.get(url, config).then(console.log).catch(console.log);
    return <div>Signed in as {session.user?.name}</div>;
  }
  console.log(session);
  return (
    <Layout>
      <main></main>

      <footer></footer>
    </Layout>
  );
};

export default Home;
