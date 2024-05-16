export interface Parkeerplaats {
  objectid: number;
  straat: string;
  type_en_merk: string;
  aantal: number;
  geo_shape: GeoShape;
  properties: object;
  geo_point_2d: GeoPoint;
}

interface GeoShape {
  type: string;
  geometry: Geometry;
}

interface Geometry {
  coordinates: number[];
  type: string;
}
interface GeoPoint {
  lon: number;
  lat: number;
}
