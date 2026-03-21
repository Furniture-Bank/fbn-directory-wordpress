import Link from "next/link";
import orgs from "@/data/organizations.json";

export default function Home() {
  const totalOrgs = orgs.length;
  const furnitureBanks = orgs.filter((o) => o.layer === "Furniture Banks").length;
  const furnishTogether = orgs.filter((o) => o.layer === "Furnish Together Members").length;
  const canada = orgs.filter((o) => o.layer === "Canada").length;

  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-red-50 text-[#c42032] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded mb-6">
              Established 1998
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-[#0f2d3d] leading-tight mb-6">
              Turning a<br />
              <em className="text-[#c42032] not-italic font-bold" style={{ fontStyle: "italic" }}>House</em><br />
              into a Home.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
              We bridge the gap between surplus furniture and families in need, ensuring everyone has a dignified place to sleep, eat, and live.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/directory"
                className="bg-[#c42032] hover:bg-[#a81b2b] text-white font-semibold px-6 py-3.5 rounded-full transition inline-flex items-center gap-2"
              >
                Find a Furniture Bank
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              <a
                href="?form=FUNHKMVGNEP"
                className="bg-white border-2 border-[#0f2d3d] text-[#0f2d3d] hover:bg-[#0f2d3d] hover:text-white font-semibold px-6 py-3.5 rounded-full transition inline-flex items-center gap-2"
              >
                Donate Furniture
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" /></svg>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-gray-100 rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden">
              <div className="text-center text-gray-400 p-8">
                <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <p className="text-sm">Hero image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact at a Glance */}
      <section className="bg-gray-50 py-16 md:py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#c42032] mb-2">Impact at a Glance</h2>
              <p className="text-gray-500">Measuring the power of community-driven circular economy since our inception.</p>
            </div>
            <Link href="/about" className="text-[#0f2d3d] font-semibold hover:text-[#c42032] transition mt-4 md:mt-0 inline-flex items-center gap-1">
              View Full Impact Report
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - White */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#c42032]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <p className="text-4xl font-bold text-[#0f2d3d] mb-1">{totalOrgs}+</p>
              <p className="text-[#c42032] text-xs font-bold tracking-widest uppercase mb-3">Organizations Listed</p>
              <p className="text-gray-500 text-sm leading-relaxed">Providing the essential items that turn an empty apartment into a place of security and hope.</p>
            </div>
            {/* Card 2 - Red */}
            <div className="bg-[#c42032] rounded-2xl p-8 text-white">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <p className="text-4xl font-bold mb-1">12M lbs</p>
              <p className="text-red-200 text-xs font-bold tracking-widest uppercase mb-3">Diverted From Landfills</p>
            </div>
            {/* Card 3 - Dark */}
            <div className="bg-[#0f2d3d] rounded-2xl p-8 text-white">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <p className="text-4xl font-bold mb-1">{furnitureBanks + furnishTogether + canada}+</p>
              <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-3">Affiliated Banks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership section */}
      <section className="bg-white py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center mt-8">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f2d3d] leading-tight mb-4">
              Multiply our reach.<br />Partner with us.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Corporations, social services, and furniture manufacturers play a critical role in our network. Join us to create sustainable social impact and environmental responsibility.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0f2d3d] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <p className="font-bold text-[#0f2d3d]">Corporate Partnerships</p>
                  <p className="text-gray-500 text-sm">CSR initiatives that deliver tangible community results.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#c42032] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-[#0f2d3d]">Agency Referral Program</p>
                  <p className="text-gray-500 text-sm">Streamlined support for social workers and housing agencies.</p>
                </div>
              </div>
            </div>
            <Link href="/get-involved" className="text-[#c42032] font-semibold hover:text-[#a81b2b] transition inline-flex items-center gap-2">
              Explore Partnership Models
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#c42032] py-16 md:py-20 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-red-100 mb-8">
            Join our newsletter to receive stories of impact and updates on how we are changing lives across the nation.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-[#c42032] font-bold px-6 py-3.5 rounded-full hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
