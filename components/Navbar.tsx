interface Props {
  path: string;
}
const Navbar = ({ path }: Props) => {
  // use path to change style of active links
  return (
    <nav className="w-full flex bg-violet-900">
      <h1>Twitcher</h1>
    </nav>
  );
};

export default Navbar;
