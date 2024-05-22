"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { ParkeerplaatsMap } from "../app/maps/ParkeerplaatsMap";
import { useState } from "react";
import { OptionsButton } from "./OptionsButton";
import { RadioButton } from "./RadioButton";
import geoJsonData from "../app/data/eindhoven_district";
import "leaflet/dist/leaflet.css";
import { PollutantMap } from "@/app/maps/PollutantMap";
import { Layer } from "leaflet";
import * as geojson from "geojson";
import { TrashcanMap } from "@/app/maps/TrashcanMap";

const MainMap = () => {
  const [displayParkingSpaces, setDisplayParkingSpaces] =
    useState<boolean>(false);

  const [selectedFeature, setSelectedFeature] =
    useState<geojson.Feature | null>(null);
  const [displayDistrictSpaces, setDisplayDistrictSpaces] =
    useState<boolean>(false);
  const [displayPollutants, setDisplayPollutants] = useState<boolean>(false);
  const [displayPM1, setDisplayPM1] = useState<boolean>(true);
  const [displayPM25, setDisplayPM25] = useState<boolean>(true);
  const [displayPM10, setDisplayPM10] = useState<boolean>(true);
  const [displayNO2, setDisplayNO2] = useState<boolean>(true);
  const [selectedPollutant, setSelectedPollutant] = useState<string>("PM1");

  const [displayTrashcans, setDisplayTrashcans] = useState<boolean>(false);

  const onEachFeature = (feature: geojson.Feature, layer: Layer) => {
    layer.on({
      click: (_) => {
        setSelectedFeature(feature);
      },
    });
  };

  const style = (feature: any) => {
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
          id="display districts"
          display_name="display districts"
          get={displayDistrictSpaces}
          set={setDisplayDistrictSpaces}
        />
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

        <OptionsButton
          id="display trashcan"
          display_name="display trashcan"
          get={displayTrashcans}
          set={setDisplayTrashcans}
        />

        {displayPollutants && (
          <>
            <h3 className="text-sm font-semibold mt-4">Pollutants</h3>
            <RadioButton
              id="display PM1"
              display_name="display PM1"
              value="PM1"
              selectedValue={selectedPollutant}
              onChange={setSelectedPollutant}
            />
            <RadioButton
              id="display PM2.5"
              display_name="display PM2.5"
              value="PM2.5"
              selectedValue={selectedPollutant}
              onChange={setSelectedPollutant}
            />
            <RadioButton
              id="display PM10"
              display_name="display PM10"
              value="PM10"
              selectedValue={selectedPollutant}
              onChange={setSelectedPollutant}
            />
            <RadioButton
              id="display NO2"
              display_name="display NO2"
              value="NO2"
              selectedValue={selectedPollutant}
              onChange={setSelectedPollutant}
            />
          </>
        )}
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
              displayPM1={selectedPollutant === "PM1" ? displayPM1 : false}
              displayPM25={selectedPollutant === "PM2.5" ? displayPM25 : false}
              displayPM10={selectedPollutant === "PM10" ? displayPM10 : false}
              displayNO2={selectedPollutant === "NO2" ? displayNO2 : false}
            />
          )}
          {displayTrashcans && <TrashcanMap />}
          {displayDistrictSpaces && geoJsonData && (
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
