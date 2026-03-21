import Link from "next/link";
import orgs from "@/data/organizations.json";

export default function Home() {
  const totalOrgs = orgs.length;
  const states = new Set(orgs.map((o) => o.state)).size;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2d3d] to-[#1a4a5e] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find a Furniture Bank Near You
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            A directory of {totalOrgs} furniture reuse organizations across{" "}
            {states} states and provinces in the US and Canada.
          </p>
          <Link
            href="/directory"
            className="inline-block bg-[#c42032] hover:bg-[#a81b2b] text-white font-semibold px-8 py-3 rounded-lg transition text-lg"
          >
            Browse the Directory
          </Link>
        </div>
      </section>

      {/* Quick stats */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-[#0f2d3d]">
              {orgs.filter((o) => o.layer === "Furniture Banks").length}
            </p>
            <p className="text-gray-600 mt-1">Furniture Banks (US)</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#0f2d3d]">
              {orgs.filter((o) => o.layer === "Furnish Together Members").length}
            </p>
            <p className="text-gray-600 mt-1">Furnish Together Members</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#0f2d3d]">
              {orgs.filter((o) => o.layer === "Canada").length}
            </p>
            <p className="text-gray-600 mt-1">Canadian Organizations</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-[#0f2d3d] mb-4">
            Are you a furniture bank that&apos;s not listed?
          </h2>
          <p className="text-gray-600 mb-6">
            If you are a furniture bank and want to be added to this directory,
            you are welcome to apply for membership.
          </p>
          <Link
            href="/get-involved"
            className="inline-block border-2 border-[#0f2d3d] text-[#0f2d3d] hover:bg-[#0f2d3d] hover:text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
