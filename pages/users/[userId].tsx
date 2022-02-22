import { useRouter } from 'next/router';
import { useVideosByUserId } from '../../hooks/twitch-api';
import Layout from '../../components/layouts/article';
import Image from 'next/image';
import CardVideo from '../../components/CardVideo';

const User = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data, error } = useVideosByUserId(userId as string);
  console.log(userId);

  if (!data) {
    return null;
  }

  console.log(data);
  return (
    <Layout>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-8 mx-auto p-4">
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
