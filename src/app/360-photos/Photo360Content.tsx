"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { properties } from "@/lib/properties";

const Viewer360 = dynamic(() => import("@/components/Viewer360"), {
  ssr: false,
});

const demoProperty = properties[0];

export default function Photos360Content() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room");

  const initialRoom =
    roomParam && demoProperty.vr.rooms.find((r) => r.id === roomParam)
      ? roomParam
      : demoProperty.vr.rooms[0].id;

  const [currentRoomId, setCurrentRoomId] = useState(initialRoom);

  useEffect(() => {
    if (roomParam && demoProperty.vr.rooms.find((r) => r.id === roomParam)) {
      setCurrentRoomId(roomParam);
    }
  }, [roomParam]);

  const currentRoom = demoProperty.vr.rooms.find(
    (r) => r.id === currentRoomId
  );

  return (
    <div className="w-full h-[calc(100vh-49px)] flex flex-col relative">
      {/* Room label */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-black/80 text-white text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full border border-white/20 backdrop-blur">
        {currentRoom?.name ?? ""}
      </div>

      <Viewer360
        rooms={demoProperty.vr.rooms}
        currentRoomId={currentRoomId}
        onRoomChange={setCurrentRoomId}
      />

      {/* Room selector */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {demoProperty.vr.rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => setCurrentRoomId(room.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
              room.id === currentRoomId
                ? "bg-white text-black border-white"
                : "bg-black/70 text-white/80 border-white/20 hover:bg-black/90 hover:border-white/40 backdrop-blur"
            }`}
          >
            {room.name}
          </button>
        ))}
      </div>
    </div>
  );
}