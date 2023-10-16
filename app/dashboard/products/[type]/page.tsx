import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import productsModel from "@/db/models/products.model";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import ProductsForm from "./form";

type Props = {
  params: { type: "add" | "edit" };
  searchParams: { id: string };
};

async function fetchProduct(id: string): Promise<any> {
  if (!id) return null;

  let data = await productsModel.findById(id).lean();
  if (!data) return null;

  return data;
}

export default async function Page({
  params: { type },
  searchParams: { id },
}: Props) {
  if (!["add", "edit"].includes(type)) return notFound();

  const session: any = await getServerSession(authOptions);
  if (session && !session.user.roles.includes("admin")) redirect("/dashboard");

  const defaultData = await fetchProduct(id);

  return <ProductsForm defaultData={defaultData} type={type} />
}
