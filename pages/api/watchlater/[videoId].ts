import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import connectDB from '../../../db/connect';
import User from '../../../models/User';
import { IUser, Token } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await connectDB(process.env.MONGO_URI!);
  const { videoId } = req.query;
  const { user } = (await getToken({ req })) as Token;

  switch (method) {
    case 'POST':
      try {
        const watchLaterUpdate = await User.updateOne(
          { userId: user?.id, 'watchLater.videoId': { $ne: videoId } },
          { $push: { watchLater: { videoId: videoId } } }
        );
        /* const userData = await User.findOne({ userId: user?.id })
        if (!userData) {
          throw new Error ('No user found')
        }
        const videoAlreadyAdded = userData?.watchLater?.find(
          (vid) => vid === video_id
        );
        if (videoAlreadyAdded) {
          throw new Error ('Video is already in watch later')
        }
        userData.watchLater = userData.watchLater ? [...userData.watchLater, video_id as String] : [video_id as String]
        userData?.save() */
        //const newWatchLater = {...userData?.watchLater, video_id}
        res.status(StatusCodes.OK).json({ success: true });
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, error });
      }
      break;
    default:
      res.status(StatusCodes.BAD_REQUEST).json({ success: false });
      break;
  }
}
