import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {/* Header */}
        <header className="bg-[#0f2d3d] text-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              <span className="text-[#c42032]">FURNITURE BANK</span>{" "}
              <span className="text-white">NETWORK</span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/directory" className="hover:text-gray-300 transition">
                Directory
              </Link>
              <Link href="/about" className="hover:text-gray-300 transition">
                About
              </Link>
              <Link
                href="/get-involved"
                className="hover:text-gray-300 transition"
              >
                Get Involved
              </Link>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-[#0f2d3d] text-gray-400 text-sm">
          <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} Furniture Bank Network. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/directory" className="hover:text-white transition">
                Directory
              </Link>
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>
              <Link href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
