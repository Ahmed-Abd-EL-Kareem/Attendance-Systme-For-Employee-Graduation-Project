import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = ({ onLocationChange }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [isInsidePolygon, setIsInsidePolygon] = useState(false);
  const onLocationChangeRef = useRef(onLocationChange);

  // Update the ref when onLocationChange changes
  useEffect(() => {
    onLocationChangeRef.current = onLocationChange;
  }, [onLocationChange]);

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

  const isPointInPolygon = useCallback((point, polygon) => {
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
  }, []);

  const trackUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const userCoordinates = [
            position.coords.longitude,
            position.coords.latitude,
          ];

          const inside = isPointInPolygon(userCoordinates, polygonCoordinates);
          setIsInsidePolygon(inside);
          if (onLocationChangeRef.current) {
            onLocationChangeRef.current(inside);
          }

          if (
            mapRef.current &&
            mapRef.current.isStyleLoaded() &&
            mapRef.current.getLayer("polygon-fill")
          ) {
            mapRef.current.setPaintProperty(
              "polygon-fill",
              "fill-color",
              inside ? "#00FF00" : "#9c0500"
            );
          }
        },
        (error) => {
          console.error("Error tracking user location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [isPointInPolygon]);

  useEffect(() => {
    if (mapRef.current) return; // Prevent multiple map initializations

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWhtZWQyMTAzMjAwMyIsImEiOiJjbTJubmhicncwNnZkMm9zODE1cmZhM3liIn0.zY0NrSZRpYw_swA7yDB-Ew";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [31.708109, 26.565009],
      zoom: 16,
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("polygon", {
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
        id: "polygon-fill",
        type: "fill",
        source: "polygon",
        paint: {
          "fill-color": "#9c0500",
          "fill-opacity": 0.5,
        },
      });

      mapRef.current.addLayer({
        id: "polygon-outline",
        type: "line",
        source: "polygon",
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });

      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      mapRef.current.addControl(geolocateControl);
      trackUserLocation();
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [trackUserLocation]);

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
