import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { Token } from '../../../types';
import { getAuthHeaders } from '../../../utils/getAuthHeaders';

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
  const { user_id } = req.query;
  if (typeof user_id !== 'string') {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: 'bad request' });
  }

  const url =
    'https://api.twitch.tv/helix/videos?' + new URLSearchParams({ user_id });

  try {
    const response = await axios.get(url, { headers });
    res.status(StatusCodes.OK).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
}
