import Link from 'next/link';

interface Props {
  href: string;
}
const ButtonLink: React.FC<Props> = ({ children, href }) => {
  return (
    <Link href={href} passHref>
      <a className="py-2 px-6 bg-violet-700 rounded-2xl text-sm uppercase font-bold">
        {children}
      </a>
    </Link>
  );
};

export default ButtonLink;
