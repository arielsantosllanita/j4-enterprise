import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { type: string };
  searchParams: { id: string };
};

async function fetchProduct(id: string): Promise<any> {
  if (!id) return null;

  // let data = await customerModel.findById(id).lean();
  // if (!data) return null;

  // return data;
}

export default async function Page({ params: {type}, searchParams: {id} }: Props) {
  if (!["add", "edit"].includes(type)) return notFound();

  const session: any = await getServerSession(authOptions);
  if (session && !session.user.roles.includes("admin")) redirect("/dashboard");

  return (
    <div className="w-11/12 md:w-3/4 lg:w-2/4 mx-auto">
      <form action=""></form>
      
    </div>
  );
}
