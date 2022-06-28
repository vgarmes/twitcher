import { useRouter } from 'next/router';
import Layout from '../../components/layouts/article';
import CardVideo, { SkeletonCardVideo } from '../../components/CardVideo';
import Loading from '../../components/Loading';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
import fetcher from '../../utils/fetcher';
import { IUser, Videos } from '../../types';
import { useUserVideos } from '../../hooks/twitch/useVideos';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';

const User = () => {
  const router = useRouter();
  const utils = trpc.useContext();
  const { userId } = router.query;
  const { data: session } = useSession();
  const { data: user, error: userError } = trpc.useQuery(['user.me'], {
    enabled: !!session,
  });
  const { data, error } = useUserVideos(session, userId);
  // TODO: optimistic update
  const addVideo = trpc.useMutation('user.add-video', {
    async onSuccess() {
      await utils.invalidateQueries(['user.me']);
    },
  });

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
                      false
                      /* user?.watchLater?.length
                        ? user.watchLater.findIndex((wl) => wl === id) > -1
                        : false */
                    }
                    onAddWatchLater={(videoId) =>
                      addVideo.mutateAsync({ videoId })
                    }
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
