import { addCustomer, updateCustomer } from "../actions";
import customerModel, { Customer } from "@/db/models/customer.model";
import { notFound, redirect } from "next/navigation";
import Form from "./form";

type Props = {
  params: { type: 'add' | 'edit' };
  searchParams: { id: string };
};

async function fetchCustomer(id: string): Promise<any> {
  if (!id) return null;
  let data: Customer | null = await customerModel.findById(id, '-addedBy').lean();
  if (!data) return null;
  data._id = String(data._id);
  
  return data;
}

export default async function New({
  params: { type },
  searchParams: { id },
}: Props) {
  if (!["add", "edit"].includes(type)) return notFound();

  const defaultData = await fetchCustomer(id);

  if (type == "edit" && !defaultData) {
    redirect("/dashboard/customer");
  }

  return <Form defaultData={defaultData} type={type} />
}

/* 
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

          </div>

          <button className="btn btn-block btn-neutral mt-3" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
*/
