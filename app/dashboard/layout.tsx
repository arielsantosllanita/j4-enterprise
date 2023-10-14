"use client";

import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";

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
  const [menuItems, setMenuItems] = useState(items);
  const { data: session, status }: any = useSession();

  useEffect(() => {
    if (!session?.user.roles.includes("admin")) {
      setMenuItems(items.filter((x) => x?.key != "/dashboard/products"));
    }
    return () => setMenuItems(items);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

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
          items={menuItems}
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
                {/* <Button icon={<MenuFoldOutlined />} type="text" size="large" /> */}
                <Button>
                  Hi, {session?.user?.firstName}
                </Button>
              </Dropdown>
            </div>
          </div>
        </Layout.Header>

        <Layout.Content style={{ margin: "16px" }}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}
