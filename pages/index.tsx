import type { NextPage } from 'next';
import { User } from 'next-auth/core/types';
import Layout from '../components/layouts/article';
import Follows from '../components/Follows';
import { useSession } from 'next-auth/react';
import Loading from '../components/Loading';

const Home: NextPage = () => {
  /* if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Something went wrong</div>;
  } */

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
