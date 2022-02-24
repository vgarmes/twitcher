import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    userId: String,
    favorites: [String],
    watchLater: [String],
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
