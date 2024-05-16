"use client";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

export default function Home() {
  return (
    <div className="w-full h-screen grid-flow-row">
      <div className="h-16 flex justify-center items-center">
        <h1 className="text-4xl font-bold text-center">Title place holder</h1>
      </div>
      <div className="flex justify-center w-full h-4/6">
        <MapContainer
          className="w-full h-full"
          center={[51.4416, 5.4697]}
          zoom={12}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-sm">Some small text at the bottom explaining</p>
      </div>
    </div>
  );
}
