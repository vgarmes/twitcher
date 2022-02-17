import Head from 'next/head';
import Sidebar from '../Sidebar';
interface Props {
  title?: string;
}
const Layout: React.FC<Props> = ({ children, title }) => (
  <div>
    {title && (
      <Head>
        <title>{title} - Twitcher</title>
      </Head>
    )}

    <Sidebar />
    <div className="px-4 py-4">{children}</div>
  </div>
);

export default Layout;
