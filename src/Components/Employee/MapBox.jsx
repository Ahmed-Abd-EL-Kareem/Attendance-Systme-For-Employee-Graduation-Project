import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
const MapBox = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

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
            // These coordinates outline Maine.
            coordinates: [
              [
                [31.706848, 26.563412],
                [31.70914, 26.563613],
                [31.708994, 26.565924],
                [31.709151, 26.566343],
                [31.708764, 26.566395],
                [31.708521, 26.566081],
                [31.706914, 26.566116],
                [31.706844, 26.563392],
              ],
            ],
          },
        },
      });

      mapRef.current.addLayer({
        id: "maine",
        type: "fill",
        source: "maine",
        layout: {},
        paint: {
          "fill-color": "#0080ff",
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
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
    return () => {
      mapRef.current.remove();
    };
  }, []);
  const [loc, setLoc] = useState("");
  // setLoc();
  console.log(mapboxgl.tracepoint);
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
