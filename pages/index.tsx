import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
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
