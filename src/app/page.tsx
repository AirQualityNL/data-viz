"use client";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ParkeerplaatsMap } from "./maps/ParkeerplaatsMap";
import { OptionsButton } from "./components/OptionsButton";
import { PollutantMap } from "./maps/PollutantMap";

export default function Home() {
  const [displayParkingSpaces, setDisplayParkingSpaces] =
    useState<boolean>(false);
  const [displayPollutants, setDisplayPollutants] = useState<boolean>(false);
  const [displayPM1, setDisplayPM1] = useState<boolean>(false);
  const [displayPM25, setDisplayPM25] = useState<boolean>(false);
  const [displayPM10, setDisplayPM10] = useState<boolean>(false);
  const [displayNO2, setDisplayNO2] = useState<boolean>(false);

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
        <OptionsButton
          id="display pollutants"
          display_name="display pollutants"
          get={displayPollutants}
          set={setDisplayPollutants}
        />
        {/* Toggle PM1 */}
        <label>
          PM1
          <input
            type="checkbox"
            checked={displayPM1}
            onChange={(e) => setDisplayPM1(e.target.checked)}
          />
        </label>
        {/* Toggle PM2.5 */}
        <label>
          PM2.5
          <input
            type="checkbox"
            checked={displayPM25}
            onChange={(e) => setDisplayPM25(e.target.checked)}
          />
        </label>
        {/* Toggle PM10 */}
        <label>
          PM10
          <input
            type="checkbox"
            checked={displayPM10}
            onChange={(e) => setDisplayPM10(e.target.checked)}
          />
        </label>
        {/* Toggle NO2 */}
        <label>
          NO2
          <input
            type="checkbox"
            checked={displayNO2}
            onChange={(e) => setDisplayNO2(e.target.checked)}
          />
        </label>
      </div>
      <div className="w-4/5">
        <MapContainer className="h-full" center={[51.4416, 5.4697]} zoom={12}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {displayParkingSpaces && <ParkeerplaatsMap />}
          {displayPollutants && (
            <PollutantMap
              displayPM1={displayPM1}
              displayPM25={displayPM25}
              displayPM10={displayPM10}
              displayNO2={displayNO2}
            />
          )}
          
        </MapContainer>
      </div>
    </div>
  );
}
