"use client";

import React from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Customer } from "@/db/models/customer.model";
import _ from "lodash";

// const onChange: TableProps<Customer>["onChange"] = (
//   pagination,
//   filters,
//   sorter,
//   extra
// ) => {
//   console.log("params", pagination, filters, sorter, extra);
// };

const CustomerTable = ({ customers }: { customers: Customer[] }) => {
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
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   sorter: (a, b) => a.age - b.age,
    // },
    {
      title: "Address",
      dataIndex: "address",
      // filters: _.uniqBy(customers.map((x) => ({ text: x.address, value: x.address })), 'value'),
      // filters: customers.map((x) => ({ text: x.address, value: x.address })),
      // onFilter: (value: any, record) => record.address.startsWith(value),
      // filterSearch: true,
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
  ];

  return (
    <Table
      scroll={{ x: true }}
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={customers}
    />
  );
};

export default CustomerTable;
