"use client"

import { Spin } from "antd";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin />;
    </div>
  );
}
