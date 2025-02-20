// import React, { useRef, useState } from "react";

// const FaceRecognition = ({ onFaceRecognition }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [isCameraOn, setIsCameraOn] = useState(false);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       videoRef.current.play();
//       setIsCameraOn(true);
//     } catch (err) {
//       console.error("Error accessing the camera:", err);
//     }
//   };

//   const stopCamera = () => {
//     const stream = videoRef.current.srcObject;
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//     videoRef.current.srcObject = null;
//     setIsCameraOn(false);
//   };

//   const captureImage = () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     // Set canvas dimensions to video dimensions
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     // Draw video frame to canvas
//     const context = canvas.getContext("2d");
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Get image data from canvas
//     const imageData = canvas.toDataURL("image/png");

//     // Send imageData to face recognition model
//     onFaceRecognition(imageData);
//   };

//   return (
//     <div>
//       <div>
//         {isCameraOn ? (
//           <video
//             ref={videoRef}
//             style={{ width: "100%", borderRadius: "10px" }}
//           />
//         ) : (
//           <button onClick={startCamera}>Start Camera</button>
//         )}
//         {isCameraOn && <button onClick={stopCamera}>Stop Camera</button>}
//       </div>
//       <div>
//         {isCameraOn && <button onClick={captureImage}>Capture Image</button>}
//       </div>
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };

// export default FaceRecognition;
import { useState, useEffect, useRef } from "react";

const CameraAccess = () => {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState("");

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      setError("Camera access denied or not available");
      console.error("Camera error:", err);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div>
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-100"
          style={{ height: "50vh" }}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="position-relative">
        {!cameraActive ? (
          <button onClick={startCamera}>Start Camera</button>
        ) : (
          <button onClick={stopCamera}>Stop Camera</button>
        )}
      </div>
    </div>
  );
};

export default CameraAccess;
// import { useState, useRef, useEffect } from 'react';
// import * as faceapi from 'face-api.js';

// const FaceRecognition = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [facesDetected, setFacesDetected] = useState(0);
//   const [modelLoaded, setModelLoaded] = useState(false);

//   // Load models
//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
//         await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//         await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
//         setModelLoaded(true);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error loading models:', error);
//         setLoading(false);
//       }
//     };

//     loadModels();
//   }, []);

//   // Start camera and detection
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;

//       // Start face detection when video starts playing
//       videoRef.current.onplaying = () => detectFaces();
//     } catch (error) {
//       console.error('Camera error:', error);
//     }
//   };

//   // Face detection function
//   const detectFaces = async () => {
//     if (!modelLoaded || !videoRef.current) return;

//     const options = new faceapi.TinyFaceDetectorOptions({
//       inputSize: 512,
//       scoreThreshold: 0.5
//     });

//     const detect = async () => {
//       const detections = await faceapi.detectAllFaces(
//         videoRef.current,
//         options
//       ).withFaceLandmarks().withFaceDescriptors();

//       setFacesDetected(detections.length);
//       drawDetectionBoxes(detections);
//       requestAnimationFrame(detect);
//     };

//     detect();
//   };

//   // Draw bounding boxes
//   const drawDetectionBoxes = (detections) => {
//     const canvas = canvasRef.current;
//     const displaySize = {
//       width: videoRef.current.videoWidth,
//       height: videoRef.current.videoHeight
//     };

//     faceapi.matchDimensions(canvas, displaySize);

//     const resizedDetections = faceapi.resizeResults(detections, displaySize);
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

//     faceapi.draw.drawDetections(canvas, resizedDetections);
//     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//   };

//   return (
//     <div className="face-recognition">
//       <h2>Face Recognition Demo</h2>

//       {loading && <p>Loading models...</p>}

//       <div style={{ position: 'relative' }}>
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           style={{ width: '100%', maxWidth: '640px' }}
//         />
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             maxWidth: '640px'
//           }}
//         />
//       </div>

//       <div className="controls">
//         <button onClick={startCamera} disabled={!modelLoaded}>
//           {modelLoaded ? 'Start Camera' : 'Loading Models...'}
//         </button>
//         <div className="stats">
//           Faces Detected: {facesDetected}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FaceRecognition;
