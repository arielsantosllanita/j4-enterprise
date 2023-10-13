"use client";
import Link from "next/link";
import { Button, Popconfirm, Space, message } from "antd";
import { FaPlus } from "react-icons/fa";
import { deleteCustomer } from "./actions";
import { useRouter } from "next/navigation";

type Props = {
  customers: any[];
};

export default function CustomerTable({ customers }: Props) {
  const router = useRouter();

  return (
    <div className="w-11/12 md:w-4/5 mx-auto">
      <div className="flex justify-end">
        <button
          className="btn btn-neutral"
          onClick={() => router.push("/dashboard/customer/add")}
        >
          <FaPlus />
          Add
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Address</th>
              <th>Mobile number</th>
              <th>Added by</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((x, i) => (
              <tr key={String(x._id)} className="hover">
                <th>{i + 1}</th>
                <td>
                  {x.name}
                  {x.default && (
                    <span className="badge badge-success ml-2 text-white">
                      default
                    </span>
                  )}
                </td>
                <td>{x.address}</td>
                <td>{x.mobile}</td>
                <td>{x.addedBy.firstName}</td>
                <td>
                  <Space size="large">
                    <Link href={`/dashboard/customer/edit?id=${String(x._id)}`}>
                      Edit
                    </Link>

                    <Popconfirm
                      title="Delete"
                      description="Are you sure to delete this customer?"
                      onConfirm={async () => {
                        await deleteCustomer(String(x._id));
                        message.success("Deleted");
                      }}
                      // onCancel={cancel}
                      okText={<span className="text-black">Yes</span>}
                      cancelText="No"
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                  </Space>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// const antdTable = () => {
//   const columns: ColumnsType<any> = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//     },
//     {
//       title: "Mobile number",
//       dataIndex: "mobile",
//       key: "mobile",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space size="middle">
//           <Link href={"/dashboard/customer/edit"}>Edit</Link>
//           <Popconfirm
//             title="Delete"
//             description="Are you sure to delete this customer?"
//             onConfirm={async () => {
//               message.success('Deleted')
//             }}
//             // onCancel={cancel}
//             okText={<span className="text-black hover:text-white">Yes</span>}
//             cancelText="No"
//           >
//             <Button danger>Delete</Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="overflow-x-auto">
//       <Table columns={columns} dataSource={customers} />
//     </div>
//   );
// }
