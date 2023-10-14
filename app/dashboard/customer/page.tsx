import connection from "@/db/connection";
import customerModel, { Customer } from "@/db/models/customer.model";
import React from "react";
import CustomerTable from "./table";

type Props = {};

export default async function Page({}: Props) {
  await connection();
  const customers: Customer[] = await customerModel
    .find({})
    .populate("addedBy")
    .lean();

  return (
    <>
      <CustomerTable
        customers={customers.map((x) => {
          x._id = String(x._id);

          return {
            ...x,
            addedBy: { ...x.addedBy, _id: String(x.addedBy._id) },
          } as Customer;
        })}
      />
    </>
  );
}
