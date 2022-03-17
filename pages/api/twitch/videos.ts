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
    query: { id, user_id },
  } = req;

  if ((!user_id && !id) || (user_id && typeof user_id !== 'string')) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'invalid query parameters' });
  }

  const session = await getSession({ req });

  if (!session || session.error) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }

  const headers = getAuthHeaders(session.accessToken as string);

  let queryParams = {};

  if (user_id) {
    queryParams = new URLSearchParams({ user_id });
  } else {
    queryParams =
      typeof id === 'string'
        ? new URLSearchParams({ id })
        : id
            .reduce((accum, singleId) => accum + `id=${singleId}&`, '')
            .slice(0, -1);
  }

  const url = 'https://api.twitch.tv/helix/videos?' + queryParams;

  try {
    const videos = await axios.get<Videos>(url, { headers });
    res.status(200).json({ success: true, ...videos.data });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}
