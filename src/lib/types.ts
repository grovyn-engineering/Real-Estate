export interface Hotspot {
  id: string;
  label: string;
  position: [number, number, number];
  targetRoomId: string;
}

export interface Room {
  id: string;
  name: string;
  panorama: string;
  model?: string;
  hotspots: Hotspot[];
  bounds: [number, number, number, number];
}

export interface VRAssets {
  model?: string;
  modelEmbed?: string;
  rooms: Room[];
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  thumbnail: string;
  vr: VRAssets;
}
