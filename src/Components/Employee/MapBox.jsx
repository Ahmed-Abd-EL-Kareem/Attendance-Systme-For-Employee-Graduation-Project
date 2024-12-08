import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = ({ onLocationChange }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const [isInsidePolygon, setIsInsidePolygon] = useState(false);

  const polygonCoordinates = [
    [31.706848, 26.563412],
    [31.70914, 26.563613],
    [31.708994, 26.565924],
    [31.709151, 26.566343],
    [31.708764, 26.566395],
    [31.708521, 26.566081],
    [31.706914, 26.566116],
    [31.706844, 26.563392],
  ];

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWhtZWQyMTAzMjAwMyIsImEiOiJjbTJubmhicncwNnZkMm9zODE1cmZhM3liIn0.zY0NrSZRpYw_swA7yDB-Ew";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [31.708109, 26.565009],
      zoom: 16,
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("maine", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [polygonCoordinates],
          },
        },
      });

      mapRef.current.addLayer({
        id: "maine",
        type: "fill",
        source: "maine",
        layout: {},
        paint: {
          "fill-color": isInsidePolygon ? "#00FF00" : "#9c0500", // Change color dynamically
          "fill-opacity": 0.5,
        },
      });

      mapRef.current.addLayer({
        id: "outline",
        type: "line",
        source: "maine",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });
    });

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    mapRef.current.addControl(geolocateControl);

    // Event listener for geolocation
    geolocateControl.on("geolocate", (e) => {
      const userCoordinates = [e.coords.longitude, e.coords.latitude];
      const inside = isPointInPolygon(userCoordinates, polygonCoordinates);

      setIsInsidePolygon(inside);
      onLocationChange(inside);

      // Update polygon color dynamically
      mapRef.current.setPaintProperty(
        "maine",
        "fill-color",
        inside ? "#00FF00" : "#9c0500"
      );
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  // Helper function to check if a point is inside a polygon
  const isPointInPolygon = (point, polygon) => {
    const x = point[0],
      y = point[1];
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0],
        yi = polygon[i][1];
      const xj = polygon[j][0],
        yj = polygon[j][1];

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  };

  return (
    <div
      id="map"
      ref={mapContainerRef}
      style={{
        height: "100%",
        border: "3px solid var(--secondaryBackground)",
        borderRadius: "20px",
      }}
    />
  );
};

export default MapBox;
