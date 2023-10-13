import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  roles: string[];
}

const UserSchema = new mongoose.Schema<Users>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["cashier"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<Users>("User", UserSchema);
