"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useI18n } from "@/contexts/I18nContext";

// 会場: 京都市役所前広場（メイン）とゼスト御池地下街
const VENUES = [
  {
    id: "plaza",
    lat: 35.0113,
    lng: 135.7681,
    color: "#b91c1c",
    emoji: "🎪",
  },
  {
    id: "zest",
    lat: 35.0107,
    lng: 135.7688,
    color: "#d97706",
    emoji: "🛍",
  },
] as const;

function createIcon(color: string, emoji: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:36px;height:36px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;font-size:18px;">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

export function VenueMap() {
  const { t } = useI18n();

  const venueLabels: Record<(typeof VENUES)[number]["id"], { name: string; desc: string }> = {
    plaza: { name: t.map.venuePlaza, desc: t.map.venuePlazaDesc },
    zest: { name: t.map.venueZest, desc: t.map.venueZestDesc },
  };

  return (
    <MapContainer
      center={[35.0112, 135.7684]}
      zoom={17}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {VENUES.map((venue) => (
        <Marker
          key={venue.id}
          position={[venue.lat, venue.lng]}
          icon={createIcon(venue.color, venue.emoji)}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-bold">{venueLabels[venue.id].name}</p>
              <p className="text-gray-500">{venueLabels[venue.id].desc}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
