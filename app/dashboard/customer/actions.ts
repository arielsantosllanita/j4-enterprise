"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import connection from "@/db/connection";
import customerModel, { Customer } from "@/db/models/customer.model";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CUSTOMER_PAGE = "/dashboard/customer";

export async function addCustomer(form: Customer) {
  await connection();
  const session: any = await getServerSession(authOptions);

  await customerModel.create({
    name: form.name,
    address: form.address,
    mobile: form.mobile,
    terms: form.terms,
    creditLimit: form.creditLimit,
    // default: form.default") == "o,
    addedBy: session?.user._id,
  });

  return redirect(CUSTOMER_PAGE);
}

export async function updateCustomer(form: Customer) {
  await connection();
  const session: any = await getServerSession(authOptions);

  await customerModel.findByIdAndUpdate(form._id, {
    name: form.name,
    address: form.address,
    mobile: form.mobile,
    terms: form.terms,
    creditLimit: form.creditLimit,
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
