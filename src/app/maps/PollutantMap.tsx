import React, { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { Pollutant } from "@/app/interfaces/pollutants"
import pollutants from "../../data/pollutants.json";

interface Props {
  displayPM1: boolean;
  displayPM25: boolean;
  displayPM10: boolean;
  displayNO2: boolean;
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
  const [pollutantData, setPollutantData] = useState<Pollutant[]>([]);
  const map = useMap();

  useEffect(() => {
    setPollutantData(pollutants as unknown as Pollutant[]);
  }, []);

  return (
    <>
      {pollutantData
        .filter((pollutant: any) => {
          return (
            (displayPM1 && pollutant["PM1 Average"]) ||
            (displayPM25 && pollutant["PM2.5 Average"]) ||
            (displayPM10 && pollutant["PM10 Average"]) ||
            (displayNO2 && pollutant["NO2 Average"])
          );
        })
        .map((pollutant: any, index) => (
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