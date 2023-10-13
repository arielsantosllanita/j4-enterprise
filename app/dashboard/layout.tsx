"use client";

import React, { useState } from "react";
import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  LogoutOutlined,
  TagOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Layout, Menu, theme } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link href={"/dashboard"}>Dashboard</Link>,
    key: "/dashboard",
    icon: <PieChartOutlined />,
  },
  {
    label: <Link href={"/dashboard/customer"}>Customers</Link>,
    key: "/dashboard/customer",
    icon: <TeamOutlined />,
  },
  {
    label: <Link href={"/dashboard/reports"}>Reports</Link>,
    key: "/dashboard/reports",
    icon: <FileOutlined />,
  },
  {
    label: "Products",
    key: "/dashboard/products",
    icon: <TagOutlined />,
    children: [
      {
        label: <Link href={"/dashboard/products/units"}>Units</Link>,
        key: "/dashboard/products/units",
      },
      {
        label: <Link href={"/dashboard/products/suppliers"}>Suppliers</Link>,
        key: "/dashboard/products/suppliers",
      },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Layout.Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Layout.Header
          style={{ padding: "0 10px", background: colorBgContainer }}
        >
          <div style={{ display: "flex", justifyContent: "end" }}>
            <div>
              <Dropdown
                menu={{
                  defaultSelectedKeys: ["null"],
                  items: [
                    {
                      label: <Link href={"/api/auth/signout"}>Logout</Link>,
                      key: "signout",
                      icon: <LogoutOutlined />,
                    },
                  ],
                }}
                placement="bottomRight"
                arrow
              >
                <Button icon={<MenuFoldOutlined />} type="text" size="large" />
              </Dropdown>
            </div>
          </div>
        </Layout.Header>

        <Layout.Content style={{ margin: "16px" }}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}
