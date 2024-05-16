"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ParkeerplaatsMap } from "./maps/ParkeerplaatsMap";

export default function Home() {
  return (
    <div className="h-screen">
      <MapContainer className="h-full" center={[51.4416, 5.4697]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ParkeerplaatsMap />
      </MapContainer>
    </div>
  );
}
