import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectDB from '../../../db/connect';
import User from '../../../models/User';
import { User as UserAuth } from 'next-auth/core/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await connectDB(process.env.MONGO_URI!);

  const session = await getSession({ req });

  if (!session || session.error) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }

  switch (method) {
    case 'GET':
      try {
        const userData = await User.findOne({
          userId: (session.user as UserAuth)?.id,
        });

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
