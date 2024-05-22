import React, { useState, useEffect } from "react";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import pollutants from "../../data/pollutants.json";
import { Pollutant } from "@/app/interfaces/pollutants";

interface PollutantMapProps {
  displayPM1: boolean;
  displayPM25: boolean;
  displayPM10: boolean;
  displayNO2: boolean;
}

const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

export const PollutantMap: React.FC<PollutantMapProps> = ({
  displayPM1,
  displayPM25,
  displayPM10,
  displayNO2
}) => {
  const [pollutantData, setPollutantData] = useState<Pollutant[]>([]);
  const [heatmapPoints, setHeatmapPoints] = useState<[number, number, number][]>([]);

  useEffect(() => {
    setPollutantData(pollutants as unknown as Pollutant[]);
  }, []);

  useEffect(() => {
    const points = pollutantData.flatMap((pollutant) => {
      const pointsArray: [number, number, ][] = [];
      if (displayPM1 && pollutant["PM1 Average"]) {
        pointsArray.push([pollutant.Latitude, pollutant.Longitude, pollutant["PM1 Average"]]);
      }
      if (displayPM25 && pollutant["PM2.5 Average"]) {
        pointsArray.push([pollutant.Latitude, pollutant.Longitude, pollutant["PM2.5 Average"]]);
      }
      if (displayPM10 && pollutant["PM10 Average"]) {
        pointsArray.push([pollutant.Latitude, pollutant.Longitude, pollutant["PM10 Average"]]);
      }
      if (displayNO2 && pollutant["NO2 Average"]) {
        pointsArray.push([pollutant.Latitude, pollutant.Longitude, pollutant["NO2 Average"]]);
      }
      return pointsArray;
    });

    setHeatmapPoints(points);
  }, [displayPM1, displayPM25, displayPM10, displayNO2, pollutantData]);

  return (
    <>
      <HeatmapLayer
          points={heatmapPoints}
          longitudeExtractor={(m) => m[1]}
          latitudeExtractor={(m) => m[0]}
          intensityExtractor={(m) => parseFloat(m[2].toString())}
        />
    </>
  );
};
