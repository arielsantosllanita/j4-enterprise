import StyledComponentsRegistry from "@/lib/AntdRegistry";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/lib/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "J4 Enterprise",
  description: "Your all-in-one-shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
