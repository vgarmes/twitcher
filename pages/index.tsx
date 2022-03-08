import type { NextPage } from 'next';
import { User } from 'next-auth/core/types';
import Layout from '../components/layouts/article';
import Follows from '../components/Follows';
import { useSession } from 'next-auth/react';
import Loading from '../components/Loading';
import getAppToken from '../utils/getAppToken';
import { AppAccessToken } from '../types';
import { getTopGames } from '../lib/twitch-api';
import GameGrid from '../components/GameGrid';

interface Props {
  topGames: any;
}
const Home: NextPage<Props> = ({ topGames }) => {
  /* if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Something went wrong</div>;
  } */

  /* <Layout>
      <main>
        <Follows />
      </main>

      <footer></footer>
    </Layout> */

  return (
    <Layout>
      <main>
        <Follows />
        <GameGrid games={topGames} />
      </main>

      <footer></footer>
    </Layout>
  );
};

export async function getStaticProps() {
  const topGames = await getTopGames();
  return {
    props: {
      topGames,
    },
    revalidate: 3600,
  };
}

export default Home;
