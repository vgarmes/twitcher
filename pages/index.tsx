import type { NextPage } from 'next';
import Layout from '../components/layouts/article';
import Follows from '../components/Follows';
import { getTopGames } from '../lib/twitch-api';
import GameGrid from '../components/GameGrid';
import ButtonLink from '../components/ButtonLink';

interface Props {
  topGames: any;
}
const Home: NextPage<Props> = ({ topGames }) => {
  return (
    <Layout>
      <main>
        <div className="flex justify-center my-20">
          <ButtonLink href="/watch-later">watch later playlist</ButtonLink>
        </div>
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
