"use client";

import React from "react";
import { Button, Popconfirm, Space, Table, Typography, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Customer } from "@/db/models/customer.model";
import _ from "lodash";
import Link from "next/link";
import { UserAddOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { deleteCustomer } from "./actions";

// const onChange: TableProps<Customer>["onChange"] = (
//   pagination,
//   filters,
//   sorter,
//   extra
// ) => {
//   console.log("params", pagination, filters, sorter, extra);
// };

const CustomerTable = ({ customers }: { customers: Customer[] }) => {
  const router = useRouter();

  const columns: ColumnsType<Customer> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: customers.map((x) => ({ text: x.name, value: x.name })),
      // filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record) => record.name.startsWith(value),
      // width: '30%',
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: _.uniqBy(
        customers.map((x) => ({ text: x.address, value: x.address })),
        "value"
      ),
      onFilter: (value: any, record) => record.address.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
    },
    {
      title: "Credit Limit",
      dataIndex: "creditLimit",
    },
    {
      title: "Added by",
      render(value, record, index) {
        return (
          <span>
            {record.addedBy.firstName} {record.addedBy.lastName}
          </span>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/dashboard/customer/edit?id=${record._id}`}>Edit</Link>

          <Popconfirm
            title="Delete"
            description="Are you sure to delete this customer?"
            onConfirm={async () => {
              await deleteCustomer(record._id);
              message.success("Deleted successfully!");
            }}
            okText="Yes"
            cancelText="No"
          >
            <Typography.Text type="danger" style={{ cursor: "pointer" }}>
              <Button type="link" danger>
                Delete
              </Button>
            </Typography.Text>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      title={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>Customers</h3>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => router.push("/dashboard/customer/add")}
          >
            Add
          </Button>
        </div>
      )}
      scroll={{ x: true }}
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={customers}
    />
  );
};

export default CustomerTable;
