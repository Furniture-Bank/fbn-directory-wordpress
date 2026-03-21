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

const CANADIAN_PROVINCES = new Set(["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK", "NT", "NU", "YT"]);

const PROVINCE_NAMES: Record<string, string> = {
  AB: "Alberta", BC: "British Columbia", MB: "Manitoba", NB: "New Brunswick",
  NL: "Newfoundland and Labrador", NS: "Nova Scotia", ON: "Ontario",
  PE: "Prince Edward Island", QC: "Quebec", SK: "Saskatchewan",
  NT: "Northwest Territories", NU: "Nunavut", YT: "Yukon",
};

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan",
  MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana",
  NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

function getCountry(state: string) {
  return CANADIAN_PROVINCES.has(state) ? "Canada" : "United States";
}

function getFullName(state: string) {
  return PROVINCE_NAMES[state] || STATE_NAMES[state] || state;
}

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [layerFilter, setLayerFilter] = useState("");

  // Get unique states sorted, split by country
  const { usStates, caProvinces } = useMemo(() => {
    const allStates = [...new Set(orgs.map((o) => o.state).filter(Boolean))].sort();
    return {
      usStates: allStates.filter((s) => !CANADIAN_PROVINCES.has(s)),
      caProvinces: allStates.filter((s) => CANADIAN_PROVINCES.has(s)),
    };
  }, []);

  const layers = useMemo(
    () => [...new Set(orgs.map((o) => o.layer))].sort(),
    []
  );

  // Available states based on country filter
  const availableStates = useMemo(() => {
    if (countryFilter === "US") return usStates;
    if (countryFilter === "CA") return caProvinces;
    return [...usStates, ...caProvinces].sort();
  }, [countryFilter, usStates, caProvinces]);

  // Reset state filter when country changes and selected state doesn't belong
  const effectiveStateFilter = availableStates.includes(stateFilter) ? stateFilter : "";

  // Filter and sort
  const filtered = useMemo(() => {
    let result = orgs as Org[];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q) ||
          o.state.toLowerCase().includes(q) ||
          (getFullName(o.state)).toLowerCase().includes(q)
      );
    }

    if (countryFilter) {
      result = result.filter((o) =>
        countryFilter === "CA"
          ? CANADIAN_PROVINCES.has(o.state)
          : !CANADIAN_PROVINCES.has(o.state)
      );
    }

    if (effectiveStateFilter) {
      result = result.filter((o) => o.state === effectiveStateFilter);
    }

    if (layerFilter) {
      result = result.filter((o) => o.layer === layerFilter);
    }

    // Sort by country (US first), then state, then city, then name
    return result.sort((a, b) => {
      const countryA = getCountry(a.state);
      const countryB = getCountry(b.state);
      if (countryA !== countryB) return countryA === "United States" ? -1 : 1;
      if (a.state !== b.state) return a.state.localeCompare(b.state);
      if (a.city !== b.city) return a.city.localeCompare(b.city);
      return a.name.localeCompare(b.name);
    });
  }, [search, countryFilter, effectiveStateFilter, layerFilter]);

  // Group by country, then by state
  const groupedByCountry = useMemo(() => {
    const countries = new Map<string, Map<string, Org[]>>();
    for (const org of filtered) {
      const country = getCountry(org.state);
      const state = org.state || "Unknown";
      if (!countries.has(country)) countries.set(country, new Map());
      const stateMap = countries.get(country)!;
      if (!stateMap.has(state)) stateMap.set(state, []);
      stateMap.get(state)!.push(org);
    }
    return countries;
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
          value={countryFilter}
          onChange={(e) => {
            setCountryFilter(e.target.value);
            setStateFilter("");
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d3d]"
        >
          <option value="">All Countries</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
        </select>
        <select
          value={effectiveStateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d3d]"
        >
          <option value="">All States / Provinces</option>
          {availableStates.map((s) => (
            <option key={s} value={s}>
              {getFullName(s)} ({s})
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

      {/* Directory listing grouped by country, then state */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 py-8 text-center">
          No organizations found matching your search.
        </p>
      ) : (
        <div className="space-y-10">
          {[...groupedByCountry.entries()].map(([country, stateMap]) => (
            <div key={country}>
              {/* Country header */}
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-[#0f2d3d]">
                  {country === "United States" ? "🇺🇸" : "🇨🇦"} {country}
                </h2>
                <span className="text-sm text-gray-500">
                  {[...stateMap.values()].reduce((sum, arr) => sum + arr.length, 0)} organizations
                </span>
              </div>

              <div className="space-y-6">
                {[...stateMap.entries()].map(([state, stateOrgs]) => (
                  <div key={state}>
                    <h3 className="text-lg font-bold text-[#0f2d3d] border-b-2 border-[#0f2d3d] pb-1 mb-3">
                      {getFullName(state)}
                    </h3>
                    <div className="space-y-2">
                      {stateOrgs.map((org) => (
                        <div
                          key={org.name + org.city}
                          className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 px-3 rounded hover:bg-gray-50 transition"
                        >
                          {/* Name + City */}
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-[#0f2d3d]">
                              {org.name}
                            </span>
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

                          {/* Visit website button */}
                          {org.website ? (
                            <a
                              href={org.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold bg-[#c42032] hover:bg-[#a81b2b] text-white px-3 py-1 rounded transition whitespace-nowrap"
                            >
                              Visit website &rarr;
                            </a>
                          ) : (
                            <Link
                              href={`/directory/${slugify(org.name)}`}
                              className="text-xs font-semibold bg-[#0f2d3d] hover:bg-[#1a4a5e] text-white px-3 py-1 rounded transition whitespace-nowrap"
                            >
                              View details &rarr;
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
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
