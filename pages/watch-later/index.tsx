import { NextPage } from 'next';
import fetcher from '../../utils/fetcher';
import useSWR, { useSWRConfig } from 'swr';
import { ApiResponse, Videos } from '../../types';
import Layout from '../../components/layouts/article';
import axios from 'axios';
import CardVideo, { SkeletonCardVideo } from '../../components/CardVideo';

const WatchLater: NextPage<{}> = () => {
  const { data, error } = useSWR<ApiResponse<Videos>>(
    '/api/me/watchlater',
    fetcher
  );
  const { mutate } = useSWRConfig();

  const mutateWatchLater = async (id: string) => {
    if (!data?.data) {
      return;
    }

    await axios.post(`/api/me/watchlater/${id}`);
    // trigger a revalidation (refetch)
    mutate('/api/me/watchlater');
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
      <h1 className="text-3xl font-bold pb-5">Watch later</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-8 mx-auto">
        {data
          ? data.data.data.map(
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
                    isWatchLater={true}
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

export default WatchLater;
