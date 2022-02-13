// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { User } from 'next-auth/core/types';
import { StatusCodes } from 'http-status-codes';
import { getAuthHeaders } from '../../../utils/getAuthHeaders';
import { getToken } from 'next-auth/jwt';
import { Follows, Token } from '../../../types';

// TODO: Add pagination support

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: 'You must be signed in' });
  }

  const headers = getAuthHeaders(token as Token);

  const followsUrl =
    'https://api.twitch.tv/helix/users/follows?' +
    new URLSearchParams({ from_id: (token?.user as User)?.id });

  const usersUrl = 'https://api.twitch.tv/helix/users?';

  try {
    const followsResponse: AxiosResponse<Follows> = await axios.get(
      followsUrl,
      { headers }
    );

    if (!(followsResponse.data?.data?.length > 0)) {
      throw new Error('no follow data found');
    }

    const queryParams = followsResponse.data.data.reduce(
      (accum, follow) => accum + `id=${follow.to_id}&`,
      ''
    );

    const usersResponse = await axios.get(usersUrl + queryParams, { headers });
    res.status(StatusCodes.OK).json({
      followed_users: usersResponse.data?.data,
      total: followsResponse.data.total,
      pagination: followsResponse.data.pagination,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
