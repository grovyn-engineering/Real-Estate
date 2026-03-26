"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { properties } from "@/lib/properties";

const GLBViewer = dynamic(() => import("@/components/GLBViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-49px)] flex items-center justify-center bg-gray-900 text-white">
      Loading 3D Model...
    </div>
  ),
});

export default function Scan3DPage() {
  const modelled = properties.filter((p) => p.vr.model);
  const [selected, setSelected] = useState(modelled[0]?.id ?? "");
  const property = modelled.find((p) => p.id === selected);

  return (
    <div className="flex flex-col w-full h-screen bg-gray-900">
      {/* Property selector bar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-gray-800 border-b border-gray-700 shrink-0">
        <span className="text-gray-400 text-sm font-medium">Property:</span>
        <div className="flex gap-2">
          {modelled.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selected === p.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        {property?.vr.modelEmbed
          ? <iframe
              src={property.vr.modelEmbed}
              title="3D Model"
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          : <GLBViewer modelPath={property?.vr.model} />
        }
      </div>
    </div>
  );
}
