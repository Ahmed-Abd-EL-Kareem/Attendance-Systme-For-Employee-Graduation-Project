import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = ({ onLocationChange }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [isInsidePolygon, setIsInsidePolygon] = useState(false);
  const onLocationChangeRef = useRef(onLocationChange);
  const geolocateControlRef = useRef(null);

  // Update the ref when onLocationChange changes
  useEffect(() => {
    onLocationChangeRef.current = onLocationChange;
  }, [onLocationChange]);

  const polygonCoordinates = [
    // [31.706848, 26.563412],
    // [31.70914, 26.563613],
    // [31.708994, 26.565924],
    // [31.709151, 26.566343],
    // [31.708764, 26.566395],
    // [31.708521, 26.566081],
    // [31.706914, 26.566116],
    // [31.706844, 26.563392],
    [31.687678, 26.562222],
    [31.688111, 26.562543],
    [31.687629, 26.563157],
    [31.686875, 26.562681],
    [31.687678, 26.562222],
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

  const updateLocationStatus = useCallback(
    (coordinates) => {
      const inside = isPointInPolygon(coordinates, polygonCoordinates);
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
    [isPointInPolygon]
  );

  useEffect(() => {
    if (mapRef.current) return;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWhtZWQyMTAzMjAwMyIsImEiOiJjbTJubmhicncwNnZkMm9zODE1cmZhM3liIn0.zY0NrSZRpYw_swA7yDB-Ew";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [31.687678, 26.562222],
      zoom: 16,
      attributionControl: false,
      preserveDrawingBuffer: true,
      maxZoom: 18,
      minZoom: 14,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("polygon", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [polygonCoordinates],
          },
        },
      });

      map.addLayer({
        id: "polygon-fill",
        type: "fill",
        source: "polygon",
        paint: {
          "fill-color": "#9c0500",
          "fill-opacity": 0.5,
        },
      });

      map.addLayer({
        id: "polygon-outline",
        type: "line",
        source: "polygon",
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });

      // تحسين إعدادات عنصر التحكم بالموقع
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
        fitBoundsOptions: {
          maxZoom: 16,
          duration: 1000,
        },
      });

      // إضافة معالجات الأحداث لعنصر التحكم بالموقع
      geolocateControl.on("geolocate", (e) => {
        const coordinates = [e.coords.longitude, e.coords.latitude];
        updateLocationStatus(coordinates);
      });

      geolocateControl.on("error", (e) => {
        console.error("Geolocation error:", e);
      });

      geolocateControl.on("trackuserlocationstart", () => {
        // بدء تتبع الموقع
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: mapRef.current.getCenter(),
            zoom: 16,
            duration: 1000,
          });
        }
      });

      geolocateControlRef.current = geolocateControl;
      map.addControl(geolocateControl);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [updateLocationStatus]);

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
