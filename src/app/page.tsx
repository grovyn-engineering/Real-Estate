import { properties } from "@/lib/properties";
import Link from "next/link";

const CARD_GRADIENTS = [
  "from-[#1a2744] via-[#2d3f6b] to-[#1e3a5f]",   // deep navy-blue — property 1
  "from-[#1a2a1a] via-[#2d4a35] to-[#1a3328]",   // deep forest — property 2
];

const ACCENT_COLORS = [
  { badge: "bg-blue-500/20 text-blue-300 border-blue-500/30", cta: "bg-blue-600 hover:bg-blue-500" },
  { badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", cta: "bg-emerald-700 hover:bg-emerald-600" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070c18] text-white">

      {/* ── Nav ───────────────────────────────────────────────────── */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-white/8">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold tracking-tight">G</span>
          <span className="font-semibold text-sm tracking-wide text-white/90">Grovyn</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-xs text-white/50 font-medium tracking-wide">
          <span className="text-white/80 cursor-default">Buy</span>
          <span className="cursor-default">Rent</span>
          <span className="cursor-default">New Projects</span>
          <span className="cursor-default">Commercial</span>
        </nav>
        <button className="text-xs font-semibold px-4 py-1.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors">
          List Property
        </button>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <p className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          Immersive Real Estate
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
          Tour Homes in<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            360° Before You Visit
          </span>
        </h1>
        <p className="text-white/50 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Walk through every room with immersive VR tours, explore 3D models,
          and navigate interactive floor plans — all from your screen.
        </p>

        {/* Fake search bar */}
        <div className="max-w-xl mx-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 backdrop-blur">
          <svg className="w-4 h-4 text-white/30 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <span className="text-white/30 text-sm">Search by city, locality or project…</span>
          <button className="ml-auto bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-semibold px-4 py-1.5 rounded-xl shrink-0">
            Search
          </button>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-8 mt-12 text-center">
          {[["2+", "Live Listings"], ["3", "Room Views"], ["360°", "VR Tours"]].map(([val, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold text-white">{val}</div>
              <div className="text-white/40 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Listings ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white/90">Featured Listings</h2>
          <span className="text-xs text-white/30">{properties.length} properties</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {properties.map((property, i) => {
            const grad   = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
            const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
            return (
              <div
                key={property.id}
                className="group bg-white/[0.04] border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:bg-white/[0.06]"
              >
                {/* Thumbnail */}
                <div className={`relative h-52 bg-gradient-to-br ${grad} overflow-hidden`}>
                  {/* Interior room grid preview */}
                  <div className="absolute inset-0 flex">
                    {property.vr.rooms.map((room, ri) => (
                      <div
                        key={room.id}
                        className="flex-1 flex flex-col items-center justify-end pb-3 border-r border-white/5 last:border-r-0"
                      >
                        <span className="text-white/40 text-[10px] font-medium tracking-wide uppercase">
                          {room.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Grid lines overlay for depth */}
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                      backgroundSize: "40px 40px"
                    }}
                  />

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      🏠
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 bg-white/10 border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur tracking-wide uppercase">
                    VR Ready
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 text-white text-sm font-bold px-3 py-1 rounded-full backdrop-blur">
                    {property.price}
                  </div>

                  {/* Bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-white text-base leading-tight">
                      {property.title}
                    </h3>
                  </div>
                  <p className="text-white/40 text-xs flex items-center gap-1 mb-4">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {property.location}
                  </p>

                  {/* Specs */}
                  <div className="flex gap-3 mb-4">
                    {[
                      [`${property.beds}`, "Beds"],
                      [`${property.baths}`, "Baths"],
                      [`${property.sqft}`, "sqft"],
                    ].map(([val, label]) => (
                      <div key={label} className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-center border border-white/8">
                        <div className="text-white text-sm font-bold">{val}</div>
                        <div className="text-white/40 text-[10px]">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Feature pills */}
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${accent.badge}`}>
                      360° · {property.vr.rooms.length} Rooms
                    </span>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-white/5 text-white/50 border-white/10">
                      3D Models
                    </span>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-white/5 text-white/50 border-white/10">
                      Floor Plan
                    </span>
                  </div>

                  <p className="text-white/35 text-xs leading-relaxed mb-5 line-clamp-2">
                    {property.description}
                  </p>

                  <Link
                    href={`/vr/${property.id}`}
                    className={`flex items-center justify-center gap-2 w-full ${accent.cta} text-white font-semibold py-3 rounded-xl transition-colors text-sm`}
                  >
                    <span>View in VR</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="border-t border-white/8 px-6 py-8 text-center text-white/20 text-xs">
        © 2025 Grovyn · Immersive Real Estate Platform
      </footer>
    </div>
  );
}
