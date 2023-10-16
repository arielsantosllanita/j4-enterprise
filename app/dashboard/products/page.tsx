import React from "react";
import ProductsTable from "./table";
import connection from "@/db/connection";
import productsModel, { Product } from "@/db/models/products.model";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {};

export default async function Page({}: Props) {
  const session: any = await getServerSession(authOptions);
  if (session && !session.user.roles.includes("admin")) redirect("/dashboard");
  
  await connection();
  const products: Product[] = await productsModel
    .find({})
    .lean();

  return (
    <>
      <ProductsTable
        products={products.map((x) => {
          x._id = String(x._id);

          return {
            ...x,
          } as Product;
        })}
      />
    </>
  );
}
