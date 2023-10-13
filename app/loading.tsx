import { Spin } from "antd";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return <Spin size="large" />;
}
