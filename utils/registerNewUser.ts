import connectDB from '../db/connect';
import User from '../models/User';

const registerNewUser = async (userId: string) => {
  await connectDB(process.env.MONGO_URI!);

  const userAlreadyExists = await User.findOne({ userId });

  if (!userAlreadyExists) {
    await User.create({ userId });
  }
};

export default registerNewUser;
