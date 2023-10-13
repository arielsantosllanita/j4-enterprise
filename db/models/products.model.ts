import mongoose from "mongoose";

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  brand: string;
  type: string;
  barcode: string;
  description: string;
  price: number;
}

const ProductSchema = new mongoose.Schema<Product>(
  {
    name: String,
    brand: String,
    type: String,
    barcode: String,
    description: String,
    price: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<Product>("Product", ProductSchema);
