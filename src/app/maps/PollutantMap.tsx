import React, { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { PollutantData } from "../interfaces/pollutant";
import pollutants from "../../data/pollutants.json";

// Define interface for pollutant data
interface PollutantData {
  Station: string;
  Latitude: number;
  Longitude: number;
  PM1: number;
  PM25: number;
  PM10: number;
  NO2: number;
}

interface Props {
    displayPM1: boolean;
    displayPM25: boolean;
    displayPM10: boolean;
    displayNO2: boolean;
  }

export const PollutantMap: React.FC<Props> = ({
    displayPM1,
    displayPM25,
    displayPM10,
    displayNO2,
  }) => {
  const [pollutantData, setPollutantData] = useState<PollutantData[]>([]);
  const map = useMap();

  useEffect(() => {
    setPollutantData(pollutants as Pollutant[]);
  }, []);

  return (
    <>
      {pollutantData
        .filter((pollutant) => {
          return (
            (displayPM1 && pollutant["PM1 Average"]) ||
            (displayPM25 && pollutant["PM2.5 Average"]) ||
            (displayPM10 && pollutant["PM10 Average"]) ||
            (displayNO2 && pollutant["NO2 Average"])
          );
        })
        .map((pollutant, index) => (
          <Marker
            key={index}
            position={[pollutant.Latitude, pollutant.Longitude]}
          >
            <Popup>
              <div>
                <p>Station: {pollutant.Station}</p>
                {displayPM1 && <p>PM1: {pollutant["PM1 Average"]}</p>}
                {displayPM25 && <p>PM2.5: {pollutant["PM2.5 Average"]}</p>}
                {displayPM10 && <p>PM10: {pollutant["PM10 Average"]}</p>}
                {displayNO2 && <p>NO2: {pollutant["NO2 Average"]}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};
