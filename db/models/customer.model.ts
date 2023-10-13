import mongoose from "mongoose";
import { Users } from "./user.model";

export interface Customer extends mongoose.Document {
  id: string;
  name: string;
  lastName: string;
  address: string;
  mobile: string;
  terms: number;
  creditLimit: number;
  default: boolean;
  addedBy: Users;
}

const CustomerSchema = new mongoose.Schema<Customer>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    terms: { type: Number, required: false, default: 0 },
    creditLimit: { type: Number, required: false, default: 0 },
    default: { type: Boolean, required: false, default: false },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model<Customer>("Customer", CustomerSchema);
