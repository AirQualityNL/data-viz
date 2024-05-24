import React, { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { Parkeerplaats } from "..//interfaces/parkeerplaats";
import parkeerplaatsen from "../../data/parkeerplaatsen.json";
import L from "leaflet";

interface ParkeerplaatsCluster {
  lat: number;
  lon: number;
  parkingSpaces: Parkeerplaats[];
}

const parkingSpaceIcon = new L.Icon({
  iconUrl: "/logos/parking.svg",
  iconSize: [38, 38],
});

export const ParkeerplaatsMap = () => {
  const [data, setData] = useState<Parkeerplaats[]>([]);
  const [complete, setComplete] = useState<Parkeerplaats[]>([]);
  const [clusters, setClusters] = useState<ParkeerplaatsCluster[]>([]);
  const map = useMap();

  useEffect(() => {
    setComplete(parkeerplaatsen as Parkeerplaats[]);
  }, []);

  useEffect(() => {
    const updateMarkers = () => {
      const bounds = map.getBounds();
      const filteredData = complete.filter((item: Parkeerplaats) =>
        bounds.contains([item.geo_point_2d.lat, item.geo_point_2d.lon])
      );
      setData(filteredData);
    };

    map.on("moveend", updateMarkers);
    return () => {
      map.off("moveend", updateMarkers);
    };
  }, [complete, map]);

  useEffect(() => {
    const groupData = () => {
      if (complete.length === 0 || !map) return;

      const bounds = map.getBounds();
      const gridSize = 0.02; // Adjust based on desired clustering level
      const grid: any = {};

      // Assign parking spaces to grid cells
      complete.forEach((parkingSpace) => {
        const gridX = Math.floor(
          (parkingSpace.geo_point_2d.lat - bounds.getSouth()) / gridSize
        );
        const gridY = Math.floor(
          (parkingSpace.geo_point_2d.lon - bounds.getWest()) / gridSize
        );
        const key = `${gridX}_${gridY}`;
        if (!grid[key]) {
          grid[key] = [];
        }
        grid[key].push(parkingSpace);
      });

      // Group adjacent grid cells into clusters
      const clusteredData = [];
      for (const key in grid) {
        const [x, y] = key.split("_").map((coord) => parseInt(coord, 10));
        const cluster = {
          lat: bounds.getSouth() + (x + 0.5) * gridSize,
          lon: bounds.getWest() + (y + 0.5) * gridSize,
          parkingSpaces: grid[key],
        };
        clusteredData.push(cluster);
      }

      // Display only 25 clusters
      const numClusters = Math.min(25, clusteredData.length);
      setClusters(clusteredData.slice(0, numClusters));
    };

    if (map) {
      map.on("moveend", groupData);
      return () => {
        map.off("moveend", groupData);
      };
    }
  }, [complete, map]);

  return (
    <>
      {data.length > 750 ? (
        <>
          {clusters.map((cluster, clusterIndex) => (
            <Marker
              icon={parkingSpaceIcon}
              key={clusterIndex}
              position={[cluster.lat, cluster.lon]}
            >
              {cluster.parkingSpaces.length}
              <Popup>
                <div>
                  <p>Parking: {cluster.parkingSpaces.length}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </>
      ) : (
        <>
          {data.map((item, index) => (
            <Marker
              icon={parkingSpaceIcon}
              key={index}
              position={[item.geo_point_2d.lat, item.geo_point_2d.lon]}
            >
              <Popup>
                <div>
                  <p>Straat: {item.straat}</p>
                  <p>Type: {item.type_en_merk}</p>
                  <p>Aantal: {item.aantal}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </>
      )}
    </>
  );
};
