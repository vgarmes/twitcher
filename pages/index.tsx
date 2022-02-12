import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Layout from '../layouts/article';
import { useFollows } from '../hooks/twitch-api';

const Home: NextPage = () => {
  const { data: session } = useSession();
  /*  
  const config = 
    {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'Client-Id': `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
        },
      }
  ; */
  const { data: follows, error } = useFollows();
  console.log(follows);

  return (
    <Layout>
      <main></main>

      <footer></footer>
    </Layout>
  );
};

export default Home;
