import { Token } from '../types';

export const getAuthHeaders = (token: Token) => {
  return {
    Authorization: `Bearer ${token.accessToken}`,
    'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
  };
};
