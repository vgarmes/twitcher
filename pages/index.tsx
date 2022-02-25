import type { NextPage } from 'next';
import { User } from 'next-auth/core/types';
import Layout from '../components/layouts/article';
import Follows from '../components/Follows';
import { useGetUser } from '../hooks/db-queries';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data, error } = useGetUser((session?.user as User)?.id);
  console.log(data);
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
