import Head from 'next/head';
import { Navbar } from '@/components';
import { Router } from 'next/router';

interface Props {
  router: Router;
}
const Main: React.FC<Props> = ({ children, router }) => {
  return (
    <div>
      <Head>
        <title>Twitcher</title>
        <meta name="description" content="Twitch videos on demand" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Victor Garcia" />
        <meta name="author" content="vgmestre" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vgmestre" />
        <meta name="twitter:creator" content="@vgmestre" />
        <meta name="twitter:image" content="/card.png" />
        <meta property="og:site_name" content="Twitcher" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/card.png" />
      </Head>
      <Navbar path={router.asPath} />
      <div>{children}</div>
    </div>
  );
};

export default Main;
