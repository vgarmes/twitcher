import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectDB from '../../../db/connect';
import User from '../../../models/User';
import { User as UserAuth } from 'next-auth/core/types';
import { getAuthHeaders } from '../../../utils/getAuthHeaders';
import axios from 'axios';
import { ApiResponse, Videos } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Videos | null>>
) {
  const { method } = req;
  await connectDB(process.env.MONGO_URI!);

  const session = await getSession({ req });

  if (!session || session.error) {
    return res
      .status(401)
      .json({ success: false, error: 'Not authorized', data: null });
  }

  if (method !== 'GET') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: 'Method not valid', data: null });
  }

  try {
    const headers = getAuthHeaders(session.accessToken as string);

    const user = await User.findOne({
      userId: (session.user as UserAuth)?.id,
    });

    if (!user?.watchLater || user.watchLater.length === 0) {
      return res
        .status(StatusCodes.OK)
        .json({
          success: true,
          data: { data: [], pagination: { cursor: '' } },
        });
    }

    const queryParams = user.watchLater
      .reduce((accum, video) => accum + `id=${video.videoId}&`, '')
      .slice(0, -1);

    const url = 'https://api.twitch.tv/helix/videos?' + queryParams;

    const videos = await axios.get<Videos>(url, { headers });

    res.status(StatusCodes.OK).json({ success: true, data: videos.data });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: String(error), data: null });
  }
}
