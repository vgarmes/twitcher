import type { NextPage } from 'next';
import Layout from '../components/layouts/article';
import Follows from '../components/Follows';

const Home: NextPage = () => {
  return (
    <Layout>
      <main>
        <Follows />
      </main>

      <footer></footer>
    </Layout>
  );
};

export default Home;
