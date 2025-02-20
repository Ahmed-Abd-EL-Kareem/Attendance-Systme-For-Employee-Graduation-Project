// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// const MapBox = ({ onLocationChange }) => {
//   const mapContainerRef = useRef();
//   const mapRef = useRef();
//   const [isInsidePolygon, setIsInsidePolygon] = useState(false);

//   const polygonCoordinates = [
//     [31.706848, 26.563412],
//     [31.70914, 26.563613],
//     [31.708994, 26.565924],
//     [31.709151, 26.566343],
//     [31.708764, 26.566395],
//     [31.708521, 26.566081],
//     [31.706914, 26.566116],
//     [31.706844, 26.563392],
//   ];

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoiYWhtZWQyMTAzMjAwMyIsImEiOiJjbTJubmhicncwNnZkMm9zODE1cmZhM3liIn0.zY0NrSZRpYw_swA7yDB-Ew";

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/outdoors-v11",
//       center: [31.708109, 26.565009], // Default center
//       zoom: 16,
//     });

//     mapRef.current.on("load", () => {
//       mapRef.current.addSource("maine", {
//         type: "geojson",
//         data: {
//           type: "Feature",
//           geometry: {
//             type: "Polygon",
//             coordinates: [polygonCoordinates],
//           },
//         },
//       });

//       mapRef.current.addLayer({
//         id: "maine",
//         type: "fill",
//         source: "maine",
//         layout: {},
//         paint: {
//           "fill-color": "#9c0500", // Default color
//           "fill-opacity": 0.5,
//         },
//       });

//       mapRef.current.addLayer({
//         id: "outline",
//         type: "line",
//         source: "maine",
//         layout: {},
//         paint: {
//           "line-color": "#000",
//           "line-width": 3,
//         },
//       });

//       // Use Geolocation API to center map on user's location
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const userCoordinates = [
//               position.coords.longitude,
//               position.coords.latitude,
//             ];

//             // mapRef.current.flyTo({
//             //   center: userCoordinates,
//             //   zoom: 16,
//             // });

//             const inside = isPointInPolygon(
//               userCoordinates,
//               polygonCoordinates
//             );

//             setIsInsidePolygon(inside);
//             onLocationChange(inside);

//             // Ensure style is loaded before updating paint properties
//             mapRef.current.on("styledata", () => {
//               mapRef.current.setPaintProperty(
//                 "maine",
//                 "fill-color",
//                 inside ? "#00FF00" : "#9c0500"
//               );
//             });
//           },
//           (error) => {
//             console.error("Error getting user location", error);
//           },
//           { enableHighAccuracy: true }
//         );
//       } else {
//         console.error("Geolocation is not supported by this browser.");
//       }
//     });
//     const geolocateControl = new mapboxgl.GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true,
//       },
//       trackUserLocation: true,
//       showUserHeading: true,
//     });

//     mapRef.current.addControl(geolocateControl);
//     return () => {
//       mapRef.current.remove();
//     };
//   }, []);

//   // Helper function to check if a point is inside a polygon
//   const isPointInPolygon = (point, polygon) => {
//     const x = point[0],
//       y = point[1];
//     let inside = false;

//     for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//       const xi = polygon[i][0],
//         yi = polygon[i][1];
//       const xj = polygon[j][0],
//         yj = polygon[j][1];

//       const intersect =
//         yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
//       if (intersect) inside = !inside;
//     }

//     return inside;
//   };

//   return (
//     <div
//       id="map"
//       ref={mapContainerRef}
//       style={{
//         height: "100%",
//         border: "3px solid var(--secondaryBackground)",
//         borderRadius: "20px",
//       }}
//     />
//   );
// };

// export default MapBox;
// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// const MapBox = ({ onLocationChange }) => {
//   const mapContainerRef = useRef();
//   const mapRef = useRef();
//   const [isInsidePolygon, setIsInsidePolygon] = useState(false);

//   const polygonCoordinates = [
//     [31.706848, 26.563412],
//     [31.70914, 26.563613],
//     [31.708994, 26.565924],
//     [31.709151, 26.566343],
//     [31.708764, 26.566395],
//     [31.708521, 26.566081],
//     [31.706914, 26.566116],
//     [31.706844, 26.563392],
//   ];

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoiYWhtZWQyMTAzMjAwMyIsImEiOiJjbTJubmhicncwNnZkMm9zODE1cmZhM3liIn0.zY0NrSZRpYw_swA7yDB-Ew";

//     // Initialize the map
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/outdoors-v11",
//       center: [31.708109, 26.565009], // Default center
//       zoom: 16,
//     });

//     mapRef.current.on("load", () => {
//       console.log("Map loaded successfully.");

//       // Add the polygon source and layer
//       mapRef.current.addSource("polygon", {
//         type: "geojson",
//         data: {
//           type: "Feature",
//           geometry: {
//             type: "Polygon",
//             coordinates: [polygonCoordinates],
//           },
//         },
//       });

//       mapRef.current.addLayer({
//         id: "polygon-fill",
//         type: "fill",
//         source: "polygon",
//         paint: {
//           "fill-color": "#9c0500", // Default color
//           "fill-opacity": 0.5,
//         },
//       });

//       mapRef.current.addLayer({
//         id: "polygon-outline",
//         type: "line",
//         source: "polygon",
//         paint: {
//           "line-color": "#000",
//           "line-width": 3,
//         },
//       });

//       // Add Geolocate Control
//       const geolocateControl = new mapboxgl.GeolocateControl({
//         positionOptions: {
//           enableHighAccuracy: true,
//         },
//         trackUserLocation: true,
//         showUserHeading: true,
//       });

//       mapRef.current.addControl(geolocateControl);

//       // Start tracking user location
//       trackUserLocation();
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//       }
//     };
//   }, []);

//   const trackUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         (position) => {
//           const userCoordinates = [
//             position.coords.longitude,
//             position.coords.latitude,
//           ];

//           const inside = isPointInPolygon(userCoordinates, polygonCoordinates);
//           setIsInsidePolygon(inside);
//           onLocationChange(inside);

//           // Ensure the map and layer exist before updating
//           if (
//             mapRef.current &&
//             mapRef.current.isStyleLoaded() &&
//             mapRef.current.getLayer("polygon-fill")
//           ) {
//             mapRef.current.setPaintProperty(
//               "polygon-fill",
//               "fill-color",
//               inside ? "#00FF00" : "#9c0500"
//             );
//           } else {
//             console.warn(
//               "Map is not initialized, style not loaded, or 'polygon-fill' layer not found."
//             );
//           }
//         },
//         (error) => {
//           console.error("Error tracking user location", error);
//         },
//         { enableHighAccuracy: true }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   // Helper function to check if a point is inside a polygon
//   const isPointInPolygon = (point, polygon) => {
//     const x = point[0],
//       y = point[1];
//     let inside = false;

//     for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//       const xi = polygon[i][0],
//         yi = polygon[i][1];
//       const xj = polygon[j][0],
//         yj = polygon[j][1];

//       const intersect =
//         yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
//       if (intersect) inside = !inside;
//     }

//     return inside;
//   };

//   return (
//     <div
//       id="map"
//       ref={mapContainerRef}
//       style={{
//         height: "100%",
//         border: "3px solid var(--secondaryBackground)",
//         borderRadius: "20px",
//       }}
//     />
//   );
// };

// export default MapBox;

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = ({ onLocationChange }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
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

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [31.708109, 26.565009], // Default center
      zoom: 16,
    });

    mapRef.current.on("load", () => {
      console.log("Map loaded successfully.");

      // Add the polygon source and layer
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
          "fill-color": "#9c0500", // Default color
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

      // Add Geolocate Control
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      mapRef.current.addControl(geolocateControl);

      // Start tracking user location
      trackUserLocation();
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [onLocationChange]);

  const trackUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const userCoordinates = [
            position.coords.longitude,
            position.coords.latitude,
          ];

          const inside = isPointInPolygon(userCoordinates, polygonCoordinates);
          setIsInsidePolygon(inside);
          onLocationChange(inside);

          // Ensure the map and layer exist before updating
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
          } else {
            console.warn(
              "Map is not initialized, style not loaded, or 'polygon-fill' layer not found."
            );
          }
        },
        (error) => {
          console.error("Error tracking user location", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

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
