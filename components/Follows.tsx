import Image from 'next/image';
import Link from 'next/link';
import Loading from './Loading';
import useFollows from '../hooks/twitch/useFollows';
import { useSession } from 'next-auth/react';

const Follows = () => {
  const { data: session } = useSession();
  const { data, error } = useFollows(session);

  if (!data && !error) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <div>something went wrong</div>;
  }

  return (
    <div className="w-full mb-16">
      <h2 className="font-bold mb-3 text-3xl">Followed users</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,_1fr))] gap-5 mx-auto mt-6">
        {data &&
          [...data.follows]
            ?.sort((a, b) =>
              a.display_name.toLowerCase() < b.display_name.toLowerCase()
                ? -1
                : a.display_name.toLowerCase() > b.display_name.toLowerCase()
                ? 1
                : 0
            )
            .map((user) => (
              <Link key={user.id} href={`/users/${user.id}`} passHref>
                <a className="relative">
                  <Image
                    className="rounded-full"
                    alt="user profile"
                    src={user.profile_image_url}
                    width={100}
                    height={100}
                  />
                </a>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Follows;
