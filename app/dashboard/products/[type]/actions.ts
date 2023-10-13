import connection from "@/db/connection";
import productsModel from "@/db/models/products.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const PRODUCT_PAGE = "/dashboard/products";

export async function addProduct(form: FormData) {
  await connection();

  await productsModel.create({
    name: form.get("name"),
    brand: form.get("brand"),
    type: form.get("type"),
    barcode: form.get("barcode"),
    description: form.get("description"),
    price: form.get("price"),
  });

  redirect(PRODUCT_PAGE);
}

export async function editProduct(form: FormData) {
  await connection();

  await productsModel.findByIdAndUpdate(form.get("_id"), {
    name: form.get("name"),
    brand: form.get("brand"),
    type: form.get("type"),
    barcode: form.get("barcode"),
    description: form.get("description"),
    price: form.get("price"),
  });

  redirect(PRODUCT_PAGE);
}

export async function deleteProduct(id: string) {
  await connection();

  await productsModel.findByIdAndRemove(id);
  revalidatePath(PRODUCT_PAGE);
  redirect(PRODUCT_PAGE);
}
