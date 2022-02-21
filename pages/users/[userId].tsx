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
        {data.data.map((video) => {
          if (!video.thumbnail_url) {
            // live video
            return null;
          }
          const thumbnail = video.thumbnail_url
            .replace('%{width}', '440')
            .replace('%{height}', '248');

          return (
            <CardVideo
              key={video.id}
              urlThumbnail={thumbnail}
              duration={video.duration}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default User;
