import { useRouter } from 'next/router';
import Layout from '../../components/layouts/article';
import CardVideo, { SkeletonCardVideo } from '../../components/CardVideo';
import Loading from '../../components/Loading';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
import fetcher from '../../utils/fetcher';
import { IUser, Videos } from '../../types';
import useUserVideos from '../../hooks/twitch/useVideos';
import { useSession } from 'next-auth/react';

const User = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: session } = useSession();
  const { data, error } = useUserVideos(session, userId);

  const { mutate } = useSWRConfig();
  const { data: user, error: userError } = useSWR<{ data: IUser }>(
    '/api/me',
    fetcher
  );
  const mutateWatchLater = async (id: string) => {
    if (!user?.data) {
      return;
    }

    await axios.post(`/api/me/watchlater/${id}`);
    // trigger a revalidation (refetch)
    mutate('/api/me');
  };

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
        {data && data.data[0].user_name}
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-8 mx-auto">
        {data
          ? data.data.map(
              ({ id, title, duration, url, thumbnail_url, created_at }) => {
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
                    videoId={id}
                    title={title}
                    url={url}
                    urlThumbnail={thumbnail}
                    duration={duration}
                    createdAt={created_at}
                    isWatchLater={
                      user?.data?.watchLater
                        ? user.data.watchLater.findIndex(
                            (wl) => wl.videoId === id
                          ) > -1
                        : false
                    }
                    onAddWatchLater={(id) => mutateWatchLater(id)}
                  />
                );
              }
            )
          : [...Array(10)].map((_, i) => <SkeletonCardVideo key={i} />)}
      </div>
    </Layout>
  );
};

export default User;
