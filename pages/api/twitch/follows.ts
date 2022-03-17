import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth/core/types';
import { getSession } from 'next-auth/react';
import { Follows, TwitchUser } from '../../../types';
import { getAuthHeaders } from '../../../utils/getAuthHeaders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || session.error) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }

  const headers = getAuthHeaders(session.accessToken as string);

  const followsUrl =
    'https://api.twitch.tv/helix/users/follows?' +
    new URLSearchParams({ from_id: (session.user as User)?.id });

  try {
    const follows = await axios.get<Follows>(followsUrl, { headers });
    const queryParams = follows.data?.data
      .reduce((accum, follow) => accum + `id=${follow.to_id}&`, '')
      .slice(0, -1);
    const usersUrl = 'https://api.twitch.tv/helix/users?' + queryParams;
    const users = await axios.get<{ data: TwitchUser[] }>(usersUrl, {
      headers,
    });
    res.status(200).json({
      follows: users.data.data,
      total: follows.data.total,
      pagination: follows.data.pagination,
    });
  } catch (error) {
    console.log(error);
  }
}
