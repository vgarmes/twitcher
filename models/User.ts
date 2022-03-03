import { model, models, Schema, Model, Document } from 'mongoose';

export interface IUserSchema extends Document {
  userId: string;
  favorites?: string[];
  watchLater?: Array<{ videoId: string }>;
}

const UserSchema = new Schema<IUserSchema>(
  {
    userId: { type: String, required: true },
    favorites: [String],
    watchLater: [{ videoId: { type: String, required: true } }],
  },
  { timestamps: true }
);

export default (models.User as Model<IUserSchema>) ||
  model<IUserSchema>('User', UserSchema);
// assign the model only if it’s not assigned already
// to avoid error: Cannot overwrite `User` model once compiled
