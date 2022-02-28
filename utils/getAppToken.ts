import axios from 'axios';
import { URLSearchParams } from 'url';

const getAppToken = () => {
  const response = axios.post(
    'https://id.twitch.tv/oauth2/token?' +
      new URLSearchParams({
        client_id: `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
        client_secret: `${process.env.TWITCH_CLIENT_SECRET}`,
        grant_type: 'client_credentials',
      })
  );
  return response;
};

export default getAppToken;
