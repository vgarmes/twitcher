export const getAuthHeaders = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
  };
};
