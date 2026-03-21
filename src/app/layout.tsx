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
        <header className="bg-white border-b border-gray-100">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/">
              <Image
                src="/logo-dark.png"
                alt="Furniture Bank Network"
                width={180}
                height={40}
                priority
              />
            </Link>
            <div className="flex items-center gap-8 text-sm font-medium text-[#0f2d3d]">
              <Link href="/about" className="hover:text-[#c42032] transition border-b-2 border-transparent hover:border-[#c42032] pb-1">
                Our Mission
              </Link>
              <Link href="/directory" className="hover:text-[#c42032] transition border-b-2 border-transparent hover:border-[#c42032] pb-1">
                Find a Bank
              </Link>
              <Link href="/about" className="hover:text-[#c42032] transition border-b-2 border-transparent hover:border-[#c42032] pb-1">
                Impact
              </Link>
              <Link href="/about" className="hover:text-[#c42032] transition border-b-2 border-transparent hover:border-[#c42032] pb-1">
                About Us
              </Link>
              <a
                href="?form=FUNHKMVGNEP"
                className="bg-[#c42032] hover:bg-[#a81b2b] text-white font-semibold px-5 py-2.5 rounded-full transition"
              >
                Donate Now
              </a>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-[#0f2d3d] text-gray-300 text-sm">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
              {/* Brand column */}
              <div>
                <p className="text-white font-bold tracking-wide text-base mb-3">FURNITURE BANK NETWORK</p>
                <p className="text-gray-400 leading-relaxed">
                  A national network of charities providing free furniture to families in need. Ensuring everyone has the comfort of home.
                </p>
              </div>
              {/* Resources */}
              <div>
                <p className="text-white font-semibold mb-3">RESOURCES</p>
                <div className="flex flex-col gap-2">
                  <Link href="/about" className="hover:text-white transition">Contact Us</Link>
                  <Link href="/about" className="hover:text-white transition">Financials</Link>
                  <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                </div>
              </div>
              {/* Get Involved */}
              <div>
                <p className="text-white font-semibold mb-3">GET INVOLVED</p>
                <div className="flex flex-col gap-2">
                  <Link href="/get-involved" className="hover:text-white transition">Volunteer</Link>
                  <Link href="/get-involved" className="hover:text-white transition">Partner With Us</Link>
                  <Link href="/get-involved" className="hover:text-white transition">Terms of Service</Link>
                </div>
              </div>
              {/* Contact */}
              <div>
                <p className="text-white font-semibold mb-3">CONTACT</p>
                <div className="flex flex-col gap-2 text-gray-400">
                  <p>125 Solidarity Way</p>
                  <p>Humanity Suite 420</p>
                  <p>hello@furniturebanksnetwork.org</p>
                  <a
                    href="?form=FUNHKMVGNEP"
                    className="inline-block mt-2 border border-[#c42032] text-[#c42032] hover:bg-[#c42032] hover:text-white font-semibold px-4 py-1.5 rounded text-xs transition"
                  >
                    501(c)(3) STATUS
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6 text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Furniture Bank Network. Registered Non-Profit Organization. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
