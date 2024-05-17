"use client";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ParkeerplaatsMap } from "./maps/ParkeerplaatsMap";
import { OptionsButton } from "./components/OptionsButton";

export default function Home() {
  const [displayParkingSpaces, setDisplayParkingSpaces] =
    useState<boolean>(false);

  return (
    <div className="h-screen flex">
      <div className="w-1/5 bg-gray-100 p-3">
        <h2 className="text-lg font-semibold mb-4">Options</h2>
        <OptionsButton
          id="display parking spaces"
          display_name="display parking spaces"
          get={displayParkingSpaces}
          set={setDisplayParkingSpaces}
        />
      </div>
      <div className="w-4/5">
        <MapContainer className="h-full" center={[51.4416, 5.4697]} zoom={12}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {displayParkingSpaces && <ParkeerplaatsMap />}
        </MapContainer>
      </div>
    </div>
  );
}
