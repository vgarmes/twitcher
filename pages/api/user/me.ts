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

  const { user } = (await getToken({ req })) as Token;

  switch (method) {
    case 'GET':
      try {
        const userData = await User.findOne({ userId: user?.id });

        res.status(StatusCodes.OK).json({ success: true, data: userData });
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, error });
      }
      break;
    default:
      res.status(StatusCodes.BAD_REQUEST).json({ success: false });
      break;
  }
}
