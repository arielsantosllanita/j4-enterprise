"use client";

import React from "react";
import { Button, Popconfirm, Space, Table, Typography, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import _ from "lodash";
import Link from "next/link";
import { TagOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { deleteProduct } from "./actions";
import { Product } from "@/db/models/products.model";

const ProductsTable = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  const columns: ColumnsType<Product> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: products.map((x) => ({ text: x.name, value: x.name })),
      filterSearch: true,
      onFilter: (value: any, record) => record.name.startsWith(value),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      filters: _.uniqBy(
        products.map((x) => ({ text: x.brand, value: x.brand })),
        "value"
      ),
      onFilter: (value: any, record) => record.brand.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/dashboard/products/edit?id=${record._id}`}>Edit</Link>

          <Popconfirm
            title="Delete"
            description="Are you sure to delete this customer?"
            onConfirm={async () => {
              await deleteProduct(record._id);
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
          <h3 style={{ margin: 0 }}>Products</h3>
          <Button
            type="primary"
            icon={<TagOutlined />}
            onClick={() => router.push("/dashboard/products/add")}
          >
            Add
          </Button>
        </div>
      )}
      scroll={{ x: true }}
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={products}
    />
  );
};

export default ProductsTable;
