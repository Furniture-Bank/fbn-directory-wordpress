import orgs from "@/data/organizations.json";
import Link from "next/link";
import { notFound } from "next/navigation";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

const LAYER_COLORS: Record<string, string> = {
  "Furniture Banks": "bg-[#0f2d3d] text-white",
  "Furnish Together Members": "bg-[#1a6b5a] text-white",
  Canada: "bg-[#c42032] text-white",
};

export function generateStaticParams() {
  return orgs.map((org) => ({ slug: slugify(org.name) }));
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const org = orgs.find((o) => slugify(o.name) === slug);

  if (!org) notFound();

  const mapsUrl = org.lat && org.lng
    ? `https://www.google.com/maps?q=${org.lat},${org.lng}`
    : org.address
    ? `https://www.google.com/maps/search/${encodeURIComponent(org.address)}`
    : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/directory"
        className="text-sm text-gray-500 hover:text-[#0f2d3d] transition mb-6 inline-block"
      >
        &larr; Back to Directory
      </Link>

      <h1 className="text-3xl font-bold text-[#0f2d3d] mb-2">{org.name}</h1>

      <span
        className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-6 ${
          LAYER_COLORS[org.layer] || "bg-gray-200 text-gray-700"
        }`}
      >
        {org.layer}
      </span>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        {/* City / State */}
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-medium">
            {org.city}
            {org.city && org.state ? ", " : ""}
            {org.state}
          </p>
        </div>

        {/* Address */}
        {org.address && (
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p>{org.address}</p>
          </div>
        )}

        {/* Phone */}
        {org.phone && (
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <a
              href={`tel:${org.phone}`}
              className="text-[#0f2d3d] hover:text-[#c42032] transition font-medium"
            >
              {formatPhone(org.phone)}
            </a>
          </div>
        )}

        {/* Email */}
        {org.email && (
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <a
              href={`mailto:${org.email}`}
              className="text-[#0f2d3d] hover:text-[#c42032] transition"
            >
              {org.email}
            </a>
          </div>
        )}

        {/* Website */}
        {org.website && (
          <div>
            <p className="text-sm text-gray-500">Website</p>
            <a
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0f2d3d] hover:text-[#c42032] transition"
            >
              {org.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          </div>
        )}

        {/* Map link */}
        {mapsUrl && (
          <div className="pt-2">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#0f2d3d] hover:bg-[#1a4a5e] text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              View on Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
