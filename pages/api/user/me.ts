import connectDB from '../../../db/connect';
import User from '../../../models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { IUser, Token } from '../../../types';
import { getToken } from 'next-auth/jwt';

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
  //const { user_id } = req.query;
  const { user } = (await getToken({ req })) as Token;

  switch (method) {
    case 'GET':
      try {
        const me = await User.findOne({ userId: user?.id });
        res.status(StatusCodes.OK).json({ success: true, data: me });
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false });
      }
      break;
    default:
      res.status(StatusCodes.BAD_REQUEST).json({ success: false });
      break;
  }
}
