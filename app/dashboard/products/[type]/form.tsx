"use client";

import { Button, Card, Form, Input, InputNumber } from "antd";
import React from "react";
import { addProduct, editProduct } from "../actions";
import { Product } from "@/db/models/products.model";

type Props = {
  type: "add" | "edit";
  defaultData?: Product;
};

export default function ProductsForm({ type, defaultData }: Props) {
  return (
    <Card style={{ width: "70%", margin: "auto" }}>
      <Form
        name="customerForm"
        onFinish={type == "add" ? addProduct : editProduct}
        layout="vertical"
      >
        {type == "edit" && (
          <Form.Item name={"_id"} initialValue={defaultData?._id} noStyle>
            <Input type="hidden" />
          </Form.Item>
        )}

        <Form.Item
          label="Name"
          name={"name"}
          initialValue={defaultData?.name}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand"
          name={"brand"}
          initialValue={defaultData?.brand}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Type"
          name={"type"}
          initialValue={defaultData?.type}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Barcode"
          name={"barcode"}
          initialValue={defaultData?.barcode}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name={"description"}
          initialValue={defaultData?.description}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name={"price"}
          initialValue={defaultData?.price}
          rules={[{ required: true }, { type: "number", min: 1 }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {type == "edit" ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
