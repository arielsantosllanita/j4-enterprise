"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import connection from "@/db/connection";
import customerModel from "@/db/models/customer.model";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CUSTOMER_PAGE = "/dashboard/customer";

export async function addCustomer(form: FormData) {
  await connection();
  const session: any = await getServerSession(authOptions);

  await customerModel.create({
    name: form.get("name"),
    address: form.get("address"),
    mobile: form.get("mobile"),
    terms: form.get("terms"),
    creditLimit: form.get("creditLimit"),
    // default: form.get("default") == "on",
    addedBy: session?.user._id,
  });

  return redirect(CUSTOMER_PAGE);
}

export async function updateCustomer(form: FormData) {
  await connection();
  const session: any = await getServerSession(authOptions);

  await customerModel.findByIdAndUpdate(form.get("_id"), {
    name: form.get("name"),
    address: form.get("address"),
    mobile: form.get("mobile"),
    terms: form.get("terms"),
    creditLimit: form.get("creditLimit"),
    // default: form.get("default") == "on",
    addedBy: session?.user._id,
  });

  return redirect(CUSTOMER_PAGE);
}

export async function deleteCustomer(id: string) {
  await connection();
  await customerModel.findByIdAndRemove(id);
  revalidatePath(CUSTOMER_PAGE);
  redirect(CUSTOMER_PAGE);
}
