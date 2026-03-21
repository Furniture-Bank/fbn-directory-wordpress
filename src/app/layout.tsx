import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

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
      <head>
        {/* Fundraise Up */}
        <Script id="fundraiseup" strategy="afterInteractive">{`
          (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track,openCheckout'
          .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
          :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
          j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a+'';
          t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=5;o.h=w.location.href;o.l=[];
          for(i=0;i<8;i++)o[l[i]]=o(l[i]);w[n]=o}
          })(window,document,'script','FundraiseUp','ADYXKZEY');
        `}</Script>
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {/* Header */}
        <header className="bg-[#0f2d3d] text-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Furniture Bank Network"
                width={200}
                height={44}
                priority
              />
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
              <a
                href="?form=FUNHKMVGNEP"
                className="bg-[#c42032] hover:bg-[#a81b2b] text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Donate
              </a>
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
