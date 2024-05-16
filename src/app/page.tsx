"use client";
import "leaflet/dist/leaflet.css";
import Image from "next/image";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Home() {
  const position = [51.505, -0.09];

  return (
    <div>
      <MapContainer
        center={[51.4416, 5.4697]}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}
