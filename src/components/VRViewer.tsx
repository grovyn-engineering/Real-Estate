"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Property } from "@/lib/types";
import VRTopBar from "@/components/VRTopBar";
import VRModeBar from "@/components/VRModeBar";

const Viewer360 = dynamic(() => import("@/components/Viewer360"), {
  ssr: false,
  loading: () => <ViewerLoader label="Loading 360° Tour..." />,
});

const GLBViewer = dynamic(() => import("@/components/GLBViewer"), {
  ssr: false,
  loading: () => <ViewerLoader label="Loading 3D Model..." />,
});

const FloorPlanViewer = dynamic(() => import("@/components/FloorPlanViewer"), {
  ssr: false,
  loading: () => <ViewerLoader label="Loading Floor Plan..." />,
});

type Mode = "360" | "3d" | "floorplan";

function ViewerLoader({ label }: { label: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-black text-white gap-3">
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-300">{label}</p>
    </div>
  );
}

export default function VRViewer({ property }: { property: Property }) {
  const [mode, setMode]           = useState<Mode>("360");
  const [currentRoomId, setRoom]  = useState(property.vr.rooms[0]?.id ?? "");
  const currentRoom               = property.vr.rooms.find((r) => r.id === currentRoomId);

  return (
    <div className="fixed inset-0 flex flex-col bg-black">
      <VRTopBar property={property} currentRoom={currentRoom} showRoom={mode === "360"} />

      <div className="flex-1 relative">
        {mode === "360" && (
          <Viewer360 rooms={property.vr.rooms} currentRoomId={currentRoomId} onRoomChange={setRoom} />
        )}
        {mode === "3d" && (
          <GLBViewer modelPath={currentRoom?.model ?? property.vr.model} />
        )}
        {mode === "floorplan" && (
          <FloorPlanViewer
            rooms={property.vr.rooms}
            onEnterRoom={(id) => { setRoom(id); setMode("360"); }}
          />
        )}
      </div>

      <VRModeBar mode={mode} has3D={!!(currentRoom?.model ?? property.vr.model)} onModeChange={setMode} />
    </div>
  );
}
