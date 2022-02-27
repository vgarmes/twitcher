import type { NextPage } from 'next';
import { User } from 'next-auth/core/types';
import Layout from '../components/layouts/article';
import Follows from '../components/Follows';
import { useGetUser } from '../hooks/db-queries';
import { useSession } from 'next-auth/react';
import Loading from '../components/Loading';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { user, isLoading, error } = useGetUser((session?.user as User)?.id);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }

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
