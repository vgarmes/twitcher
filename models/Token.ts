import { model, models, Schema, Model, Document } from 'mongoose';

export interface ITokenSchema extends Document {
  accessToken: string;
  expires: number;
  tokenType: string;
}

const TokenSchema = new Schema<ITokenSchema>(
  {
    accessToken: { type: String, required: true },
    expires: { type: Number, required: true },
    tokenType: { type: String, required: true },
  },
  { timestamps: true }
);

export default (models.Token as Model<ITokenSchema>) ||
  model<ITokenSchema>('Token', TokenSchema);
