import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    userId: String,
    favorites: [String],
    watchLater: [String],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
// assign the model only if it’s not assigned already
// to avoid error: Cannot overwrite `User` model once compiled
