import React, { useEffect, useRef } from "react";
import L from "leaflet";

const Map = ({ lat, lon }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const myMap = L.map(mapRef.current).setView([lat, lon], 11);
    const attribution =
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(myMap);
  }, [lat, lon]);

  return (
    <div
      id="myMap"
      ref={mapRef}
      style={{ display: "block", height: "400px" }}
    ></div>
  );
};

export default Map;
