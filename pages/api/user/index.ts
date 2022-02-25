import connectDB from '../../../db/connect';
import User from '../../../models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../../types';

type Data = {
  success: boolean;
  data?: IUser;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  await connectDB(process.env.MONGO_URI!);
  const { user_id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({ userId: user_id });
        res.status(StatusCodes.OK).json({ success: true, data: user });
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false });
      }
      break;
    default:
      res.status(StatusCodes.BAD_REQUEST).json({ success: false });
      break;
  }
}
