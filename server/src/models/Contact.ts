import mongoose, { Schema } from 'mongoose';

export interface IContact extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatar: string;
  gender: 'men' | 'women';
  status: string;
  favorite: boolean;
}

const contactSchema = new Schema<IContact>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['men', 'women'],
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IContact>('Contact', contactSchema);
