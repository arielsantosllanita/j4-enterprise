"use server";
import connection from "@/db/connection";
import productsModel, { Product } from "@/db/models/products.model";
import { redirect } from "next/navigation";

const PRODUCT_PAGE = "/dashboard/products";

export async function addProduct(form: Product) {
  await connection();

  await productsModel.create({
    name: form.name,
    brand: form.brand,
    type: form.type,
    barcode: form.barcode,
    description: form.description,
    price: form.price,
  });

  redirect(PRODUCT_PAGE);
}

export async function editProduct(form: Product) {
  await connection();

  await productsModel.findByIdAndUpdate(form._id, {
    name: form.name,
    brand: form.brand,
    type: form.type,
    barcode: form.barcode,
    description: form.description,
    price: form.price,
  });

  redirect(PRODUCT_PAGE);
}

export async function deleteProduct(id: string) {
  await connection();

  await productsModel.findByIdAndRemove(id);
  redirect(PRODUCT_PAGE);
}
