import Image from 'next/image';
import Link from 'next/link';
import Loading from './Loading';
import { useGetFollows } from '../lib/twitch-api';

const Follows = () => {
  const { data, isLoading, error } = useGetFollows();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="uppercase font-bold text-sm p-1.5">Followed</h1>
      <ul>
        {data &&
          data.follows
            .sort((a, b) =>
              a.display_name < b.display_name
                ? -1
                : a.display_name > b.display_name
                ? 1
                : 0
            )
            .map((user) => (
              <li key={user.id}>
                <Link href={`/users/${user.id}`} passHref>
                  <a className="flex items-center p-1.5">
                    <Image
                      className="rounded-full px-3"
                      alt="user profile"
                      src={user.profile_image_url}
                      width={30}
                      height={30}
                    />

                    <p className="text-sm pl-2">{user.display_name}</p>
                  </a>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Follows;
