import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useVenue } from "../contexts/VenueContext";
import "leaflet/dist/leaflet.css";

const MyMap = () => {
  // Static coordinates for St. John's area venues

  const { venues } = useVenue();
  const getStaticCoordinates = (venueId) => {
    // Create consistent coordinates based on venue ID
    const basePosition = [47.5605, -52.7128]; // St. John's center

    // Generate slightly different positions for each venue
    // const venuesCount = 8;
    const index = venueId % venues.length; // Simple hash to spread out markers

    const latOffset = (index % venues.length) * 0.02; // 0.01 degree ~ 1.1km
    const lngOffset = Math.floor(index / venues.length) * 0.01;

    return [
      basePosition[0] + latOffset - 0.015, // Spread them out a bit
      basePosition[1] + lngOffset - 0.015,
    ];
  };

  // Calculate map center based on venues or use default
  const mapCenter =
    venues.length > 0
      ? getStaticCoordinates(venues[0].id)
      : [47.5605, -52.7128]; // Default St. John's coordinates

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Display all venues as markers */}
      {venues.map((venue) => {
        const coordinates = getStaticCoordinates(venue.id);

        return (
          <Marker key={venue.id} position={coordinates}>
            <Popup>
              <div style={{ minWidth: "200px" }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
                  {venue.venueName || "Unnamed Venue"}
                </h3>

                {venue.address && (
                  <p style={{ margin: "4px 0" }}>
                    <strong>Address:</strong> {venue.address}
                  </p>
                )}

                {venue.city && (
                  <p style={{ margin: "4px 0" }}>
                    <strong>City:</strong> {venue.city}
                  </p>
                )}

                {venue.venueSize && (
                  <p style={{ margin: "4px 0" }}>
                    <strong>Capacity:</strong> {venue.venueSize} people
                  </p>
                )}

                {venue.venueTypes && venue.venueTypes.length > 0 && (
                  <p style={{ margin: "4px 0" }}>
                    <strong>Event Types:</strong> {venue.venueTypes.join(", ")}
                  </p>
                )}

                {venue.contactInfo && (
                  <p style={{ margin: "4px 0" }}>
                    <strong>Contact:</strong> {venue.contactInfo}
                  </p>
                )}

                <p
                  style={{
                    margin: "8px 0 0 0",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  Submitted: {new Date(venue.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Show message if no venues */}
      {venues.length === 0 && (
        <Marker position={mapCenter}>
          <Popup>
            No venues found. Add some venues to see them on the map!
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MyMap;
