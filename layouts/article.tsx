import Head from 'next/head';
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
    {children}
  </div>
);

export default Layout;
