import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getAuthHeaders } from '../../../utils/getAuthHeaders';
import { Videos } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { user_id },
  } = req;

  if (!user_id || typeof user_id !== 'string') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'invalid query parameters' });
  }

  const session = await getSession({ req });

  if (!session || session.error) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }

  const headers = getAuthHeaders(session.accessToken as string);

  const url =
    'https://api.twitch.tv/helix/videos?' + new URLSearchParams({ user_id });

  try {
    const videos = await axios.get<Videos>(url, { headers });
    res.status(200).json(videos.data);
  } catch (error) {
    console.log(error);
  }
}
