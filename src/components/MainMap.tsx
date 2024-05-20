"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { ParkeerplaatsMap } from "../app/maps/ParkeerplaatsMap";
import { useState } from "react";
import { OptionsButton } from "./OptionsButton";
import geoJsonData from "../app/data/eindhoven_district";
import "leaflet/dist/leaflet.css";

const MainMap = () => {
  const [displayParkingSpaces, setDisplayParkingSpaces] =
    useState<boolean>(false);

  const [selectedFeature, setSelectedFeature] = useState(null);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: (e) => {
        const district_name = feature.properties.name as string;
        setSelectedFeature(feature);
      },
    });
  };

  const style = (feature) => {
    return {
      fillColor: feature === selectedFeature ? "red" : "blue",
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.5,
    };
  };

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
          {geoJsonData && (
            <GeoJSON
              data={geoJsonData as any}
              style={style}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MainMap;
