"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import orgs from "@/data/organizations.json";

type Org = (typeof orgs)[number];

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

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [layerFilter, setLayerFilter] = useState("");

  // Get unique states sorted
  const states = useMemo(() => {
    const s = [...new Set(orgs.map((o) => o.state).filter(Boolean))].sort();
    return s;
  }, []);

  const layers = useMemo(
    () => [...new Set(orgs.map((o) => o.layer))].sort(),
    []
  );

  // Filter and sort
  const filtered = useMemo(() => {
    let result = orgs as Org[];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q) ||
          o.state.toLowerCase().includes(q)
      );
    }

    if (stateFilter) {
      result = result.filter((o) => o.state === stateFilter);
    }

    if (layerFilter) {
      result = result.filter((o) => o.layer === layerFilter);
    }

    // Sort by state, then city, then name
    return result.sort((a, b) => {
      if (a.state !== b.state) return a.state.localeCompare(b.state);
      if (a.city !== b.city) return a.city.localeCompare(b.city);
      return a.name.localeCompare(b.name);
    });
  }, [search, stateFilter, layerFilter]);

  // Group by state for the 2007-style display
  const grouped = useMemo(() => {
    const map = new Map<string, Org[]>();
    for (const org of filtered) {
      const key = org.state || "Unknown";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(org);
    }
    return map;
  }, [filtered]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0f2d3d] mb-2">
        Find a Furniture Bank
      </h1>
      <p className="text-gray-600 mb-6">
        Sorted by state and city. Click a name to visit their website.
      </p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name, city, or state..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d3d]"
        />
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d3d]"
        >
          <option value="">All States / Provinces</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={layerFilter}
          onChange={(e) => setLayerFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d3d]"
        >
          <option value="">All Types</option>
          {layers.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {filtered.length} organization{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Directory listing grouped by state */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 py-8 text-center">
          No organizations found matching your search.
        </p>
      ) : (
        <div className="space-y-6">
          {[...grouped.entries()].map(([state, stateOrgs]) => (
            <div key={state}>
              <h2 className="text-lg font-bold text-[#0f2d3d] border-b-2 border-[#0f2d3d] pb-1 mb-3">
                {state}
              </h2>
              <div className="space-y-2">
                {stateOrgs.map((org) => (
                  <div
                    key={org.name + org.city}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 px-3 rounded hover:bg-gray-50 transition"
                  >
                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      {org.website ? (
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#0f2d3d] hover:text-[#c42032] transition"
                        >
                          {org.name}
                        </a>
                      ) : (
                        <Link
                          href={`/directory/${slugify(org.name)}`}
                          className="font-semibold text-[#0f2d3d] hover:text-[#c42032] transition"
                        >
                          {org.name}
                        </Link>
                      )}
                      {org.city && (
                        <span className="text-gray-500 text-sm ml-2">
                          {org.city}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    {org.phone && (
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatPhone(org.phone)}
                      </span>
                    )}

                    {/* Layer badge */}
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                        LAYER_COLORS[org.layer] || "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {org.layer === "Furnish Together Members"
                        ? "Furnish Together"
                        : org.layer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
