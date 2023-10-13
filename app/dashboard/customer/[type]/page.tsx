import React from "react";
import { addCustomer, updateCustomer } from "../actions";
import customerModel, { Customer } from "@/db/models/customer.model";
import { notFound } from "next/navigation";

type Props = {
  params: { type: string };
  searchParams: { id: string };
};

async function fetchCustomer(id: string): Promise<any> {
  if (!id) return null;

  let data = await customerModel.findById(id).lean();
  if (!data) return null;

  // data._id = String(data._id);
  return data;
}

export default async function New({
  params: { type },
  searchParams: { id },
}: Props) {
  if (!["add", "edit"].includes(type)) return notFound();
  
  const defaultData = await fetchCustomer(id);

  return (
    <div className="w-11/12 md:w-3/4 lg:w-2/4 mx-auto">
      <form action={type == "edit" ? updateCustomer: addCustomer}>
        <div className="mt-4 flex flex-col space-y-3">
          {id && <input type="hidden" name="_id" value={id} />}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={defaultData?.name}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              defaultValue={defaultData?.address}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Phone number</span>
            </label>
            <input
              type="text"
              pattern="\d*"
              minLength={11}
              maxLength={11}
              name="mobile"
              defaultValue={defaultData?.mobile}
              placeholder="Phone number (ex. 09978276640)"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Terms</span>
            </label>
            <input
              type="number"
              name="terms"
              placeholder="Terms"
              defaultValue={defaultData?.terms}
              className="input input-bordered w-full"
              min={1}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Credit Limit</span>
            </label>
            <input
              type="number"
              name="creditLimit"
              placeholder="Credit Limit"
              defaultValue={defaultData?.creditLimit}
              className="input input-bordered w-full"
              min={1}
              required
            />
          </div>

          {/* <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Default</span>
              <input type="checkbox" name="default" className="toggle" />
            </label>
          </div> */}
        </div>

        <button className="btn btn-block btn-neutral mt-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
