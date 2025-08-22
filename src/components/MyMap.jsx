import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MyMap = () => {
  const position = [47.5605, -52.7128]; // St. John's, NL coordinates

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          St. John's, Newfoundland and Labrador <br />
          Beautiful east coast city!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
