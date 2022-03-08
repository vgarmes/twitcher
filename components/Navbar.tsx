import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  path: string;
}
const Navbar = ({ path }: Props) => {
  // use path to change style of active links
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="relative w-full h-10 flex justify-between items-center bg-violet-700 px-4">
      <Link href="/" passHref>
        <a className="font-bold">Twitcher</a>
      </Link>
      <div className="flex items-center">
        {session?.user ? (
          <h2 className="text-slate-50">{session.user.name}</h2>
        ) : (
          <h2 className="text-slate-50" onClick={() => signIn()}>
            Sign in
          </h2>
        )}
        {session?.user?.image && (
          <div
            className="pl-3 flex items-center cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image
              className="rounded-full px-3"
              src={session.user.image}
              width={30}
              height={30}
              alt="user profile"
            />
          </div>
        )}
      </div>
      {isMenuOpen && (
        <div className="absolute top-full right-0 p-2 rounded-md bg-slate-700">
          <button className="p-1" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
