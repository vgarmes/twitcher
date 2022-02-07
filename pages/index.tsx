import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import axios from 'axios';

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
    <div>
      <Head>
        <title>Twitcher</title>
        <meta name="description" content="Twitch videos on demand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>

      <footer></footer>
    </div>
  );
};

export default Home;
