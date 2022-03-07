import axios from 'axios';
import { URLSearchParams } from 'url';
import connectDB from '../db/connect';
import Token from '../models/Token';
import { AppToken } from '../types';

const getAppToken = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    const token = await Token.findOne({ tokenType: 'bearer' });

    // no token is available
    if (!token) {
      const newToken = await getNewToken();
      const appToken = {
        accessToken: newToken?.access_token,
        expires: newToken?.expires_in * 1000 + Date.now(),
        tokenType: newToken?.token_type,
      };
      return await Token.create(appToken);
    }

    // token is valid
    if (Date.now() < token.expires) {
      return token;
    }

    // token has expired
    const newToken = await getNewToken();
    token.accessToken = newToken.access_token;
    token.expires = newToken.expires_in * 1000 + Date.now();
    token.tokenType = newToken.token_type;
    await token.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const getNewToken: () => Promise<AppToken> = async () => {
  const response = await axios.post(
    'https://id.twitch.tv/oauth2/token?' +
      new URLSearchParams({
        client_id: `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
        client_secret: `${process.env.TWITCH_CLIENT_SECRET}`,
        grant_type: 'client_credentials',
      })
  );
  return response.data;
};

export default getAppToken;
