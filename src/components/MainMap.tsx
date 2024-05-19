'use client';

import { MapContainer, TileLayer } from "react-leaflet";
import { ParkeerplaatsMap } from "../app/maps/ParkeerplaatsMap";
import { useState } from "react";
import { OptionsButton } from "./OptionsButton";

import "leaflet/dist/leaflet.css";
import { PollutantMap } from "@/app/maps/PollutantMap";

const MainMap = () => {
    const [displayParkingSpaces, setDisplayParkingSpaces] =
        useState<boolean>(false);
    const [displayPollutants, setDisplayPollutants] = useState<boolean>(false);
    const [displayPM1, setDisplayPM1] = useState<boolean>(true);
    const [displayPM25, setDisplayPM25] = useState<boolean>(true);
    const [displayPM10, setDisplayPM10] = useState<boolean>(true);
    const [displayNO2, setDisplayNO2] = useState<boolean>(true);

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

                {displayPollutants && (
                    <>
                        <h3 className="text-sm font-semibold mt-4">Pollutants</h3>
                        <OptionsButton
                            id="display PM1"
                            display_name="display PM1"
                            get={displayPM1}
                            set={setDisplayPM1}
                        />
                        <OptionsButton
                            id="display PM2.5"
                            display_name="display PM2.5"
                            get={displayPM25}
                            set={setDisplayPM25}
                        />
                        <OptionsButton
                            id="display PM10"
                            display_name="display PM10"
                            get={displayPM10}
                            set={setDisplayPM10}
                        />
                        <OptionsButton
                            id="display NO2"
                            display_name="display NO2"
                            get={displayNO2}
                            set={setDisplayNO2}
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
};

export default MainMap;