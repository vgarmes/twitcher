import type { NextPage } from 'next';
import Layout from '../components/layouts/article';
import Follows from '../components/Follows';
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
