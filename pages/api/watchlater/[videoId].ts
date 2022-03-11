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
        // add video to watch later if it's not already there
        const updatedUser = await User.updateOne(
          { userId: user?.id, 'watchLater.videoId': { $ne: videoId } },
          { $push: { watchLater: { videoId: videoId } } }
        );

        if (!updatedUser.modifiedCount) {
          if (!updatedUser.acknowledged) {
            res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ success: false, error: 'Could not add video' });
          }
          // remove video
          await User.updateOne(
            { userId: user?.id },
            { $pull: { watchLater: { videoId: videoId } } }
          );
        }

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
