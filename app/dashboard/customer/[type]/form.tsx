"use client";

import { Customer } from "@/db/models/customer.model";
import { Button, Card, Form, Input, InputNumber } from "antd";
import React from "react";
import { addCustomer, updateCustomer } from "../actions";

type Props = {
  type: "add" | "edit";
  defaultData?: Customer;
};

export default function CustomerForm({ type, defaultData }: Props) {
  return (
    <Card style={{ width: "70%", margin: "auto" }}>
      <Form
        name="customerForm"
        onFinish={type == "add" ? addCustomer : updateCustomer}
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
          label="Address"
          name={"address"}
          initialValue={defaultData?.address}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name={"mobile"}
          initialValue={defaultData?.mobile}
          rules={[
            { required: true },
            () => ({
              validator(_, value) {
                if (String(value).length == 10) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Invalid number format"));
              },
            }),
          ]}
        >
          <InputNumber addonBefore="+63" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Terms"
          name={"terms"}
          initialValue={defaultData?.terms}
          rules={[{ required: true }, { type: "number", min: 1 }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Credit Limit"
          name={"creditLimit"}
          initialValue={defaultData?.creditLimit}
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
