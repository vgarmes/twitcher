import { useRouter } from 'next/router';
import Layout from '../../components/layouts/article';
import CardVideo from '../../components/CardVideo';
import Loading from '../../components/Loading';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
import fetcher from '../../utils/fetcher';
import { IUser, Videos } from '../../types';

const User = () => {
  const router = useRouter();
  const { userId } = router.query;
  const url =
    typeof userId === 'string'
      ? '/api/twitch/videos?' + new URLSearchParams({ user_id: userId })
      : null;
  const { data, error } = useSWR<Videos>(url, fetcher);
  const { mutate } = useSWRConfig();
  const { data: user, error: userError } = useSWR<{ data: IUser }>(
    '/api/user/me',
    fetcher
  );
  const mutateWatchLater = async (id: string) => {
    if (!user?.data) {
      return;
    }
    // update local data
    mutate(
      '/api/user/me',
      {
        ...user.data,
        watchLater: [...user.data.watchLater, { videoId: id }],
      },
      false
    );

    await axios.post(`/api/watchlater/${id}`);
    // trigger a revalidation (refetch)
    mutate('/api/user/me');
  };

  if (!data && !error) {
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
        {data && data.data[0].user_name}
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-8 mx-auto">
        {data?.data.map(
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
        )}
      </div>
    </Layout>
  );
};

export default User;
