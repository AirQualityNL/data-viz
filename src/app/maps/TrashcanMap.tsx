import React, { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { Parkeerplaats as Trashcans } from "..//interfaces/parkeerplaats";
import trashcans from "@/data/afvalbakken0.json";
import L from "leaflet";

interface TrashcansCluster {
  lat: number;
  lon: number;
  parkingSpaces: Trashcans[];
}

const iconTrashBin = new L.Icon({
  iconUrl: "/logos/trashbin.svg",
  iconSize: [38, 38],
});

export const TrashcanMap = () => {
  const [data, setData] = useState<Trashcans[]>([]);
  const [complete, setComplete] = useState<Trashcans[]>([]);
  const [clusters, setClusters] = useState<TrashcansCluster[]>([]);
  const map = useMap();

  useEffect(() => {
    setComplete(trashcans as unknown as Trashcans[]);
  }, []);

  useEffect(() => {
    const updateMarkers = () => {
      const bounds = map.getBounds();
      const filteredData = complete.filter((item: Trashcans) =>
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
      const grid = {};

      // Assign parking spaces to grid cells
      complete.forEach((trashcans: any) => {
        const gridX = Math.floor(
          (trashcans.geo_point_2d.lat - bounds.getSouth()) / gridSize
        );
        const gridY = Math.floor(
          (trashcans.geo_point_2d.lon - bounds.getWest()) / gridSize
        );
        const key = `${gridX}_${gridY}`;
        if (!grid[key]) {
          grid[key] = [];
        }
        grid[key].push(trashcans);
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
              key={clusterIndex}
              position={[cluster.lat, cluster.lon]}
              icon={iconTrashBin}
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
              key={index}
              position={[item.geo_point_2d.lat, item.geo_point_2d.lon]}
              icon={iconTrashBin}
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
