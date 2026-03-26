"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { properties } from "@/lib/properties";

const FloorPlanViewer = dynamic(() => import("@/components/FloorPlanViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-49px)] flex items-center justify-center bg-[#0d0d0d] text-white text-sm tracking-widest uppercase">
      Loading Model…
    </div>
  ),
});

const demoProperty = properties[0];

export default function FloorPlanPage() {
  const router = useRouter();

  return (
    <div className="w-full h-[calc(100vh-49px)]">
      <FloorPlanViewer
        rooms={demoProperty.vr.rooms}
        onEnterRoom={(roomId) => router.push(`/360-photos?room=${roomId}`)}
      />
    </div>
  );
}
