import { AppWrapper } from "@/providers/AppWrapper";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doctor Tracker - Administrative Portal",
  description:
    "Secure administrative web application for managing doctors and patients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
