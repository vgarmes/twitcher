import { useRouter } from 'next/router';
import { useVideosByUserId } from '../../hooks/twitch-api';
import Layout from '../../components/layouts/article';
import CardVideo from '../../components/CardVideo';
import Loading from '../../components/Loading';

const User = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data, error } = useVideosByUserId(userId as string);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex justify-center">
        <p className="text-lg">Ooops! Something went wrong...</p>
      </div>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold pb-5">
        {data.data?.length > 0 && data.data[0].user_name}
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-8 mx-auto">
        {data.data.map(({ id, title, duration, thumbnail_url, created_at }) => {
          if (!thumbnail_url) {
            // live video
            return null;
          }
          const thumbnail = thumbnail_url
            .replace('%{width}', '440')
            .replace('%{height}', '248');

          return (
            <CardVideo
              key={id}
              title={title}
              urlThumbnail={thumbnail}
              duration={duration}
              createdAt={created_at}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default User;
