import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

interface Props {
  path: string;
}
const Navbar = ({ path }: Props) => {
  // use path to change style of active links
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="w-full h-10 flex justify-between items-center bg-violet-900">
      <h1 className="px-3 font-bold text-slate-50">Twitcher</h1>
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
            className="px-3 flex items-center"
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
      {isMenuOpen && <div className="absolute"></div>}
    </nav>
  );
};

export default Navbar;
