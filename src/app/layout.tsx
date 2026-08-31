import type { Metadata } from "next";
import "./globals.css";
import FrameBridge from "./frame-bridge";

export const metadata: Metadata = {
  title: "Furniture Bank Network | Find a Furniture Bank Near You",
  description:
    "Search the North American directory of furniture banks. Find furniture reuse organizations by state, province, or name.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <main>{children}</main>
        <FrameBridge />
      </body>
    </html>
  );
}
