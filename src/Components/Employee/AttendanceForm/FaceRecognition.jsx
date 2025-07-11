// import React, { useRef, useState, useEffect } from "react";
// import { RiCameraLensFill } from "react-icons/ri";
// import { CgClose } from "react-icons/cg";
// import axios from "axios";
// import { toast } from "react-toastify";

// const FaceRecognition = ({
//   onRecognitionResult,
//   onProcessingChange,
//   employeeId,
// }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [iconColor, setIconColor] = useState("white");
//   const [toggle, setToggle] = useState(false);

//   // Start camera
//   const startCamera = async () => {
//     try {
//       setError("");
//       if (onProcessingChange) onProcessingChange(true);
//       setToggle(true);

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user" },
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         setCameraActive(true);
//       }
//     } catch (err) {
//       setError("Camera access denied or not available");
//       setCameraActive(false);
//       setToggle(false);
//       if (onRecognitionResult)
//         onRecognitionResult({
//           status: "failed",
//           message: "Camera access denied or not available",
//         });
//       if (onProcessingChange) onProcessingChange(false);
//     }
//   };

//   // Stop camera
//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     setCameraActive(false);
//     setToggle(false);
//     if (onProcessingChange) onProcessingChange(false);
//   };

//   // Capture and send image to backend
//   const captureAndRecognize = async () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     setLoading(true);
//     if (onProcessingChange) onProcessingChange(true);

//     setError("");
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     canvas.toBlob(async (blob) => {
//       const formData = new FormData();
//       formData.append("image", blob, "face.jpg");
//       if (!employeeId) {
//         setError("Employee ID not provided");
//         setLoading(false);
//         if (onRecognitionResult)
//           onRecognitionResult({
//             status: "failed",
//             message: "Employee ID not provided",
//           });
//         return;
//       }
//       formData.append("employeeId", employeeId);
//       try {
//         const response = await axios.post(
//           "http://127.0.0.1:8000/api/v1/face-recognition/recognize",
//           formData,
//           { withCredentials: true }
//         );
//         // Check for unknown or failed recognition
//         // console.log(response.data);
//         if (
//           response.data.employee_name &&
//           response.data.employee_name !== "Unknown" &&
//           response.data.employee_id
//         ) {
//           toast.success("Face recognition successful", { theme: "colored" });
//           stopCamera();
//           setIconColor("green");
//           if (onRecognitionResult)
//             onRecognitionResult({ status: "success", data: response.data });
//         } else {
//           stopCamera();
//           setIconColor("red");
//           if (onRecognitionResult)
//             onRecognitionResult({
//               status: "failed",
//               message:
//                 "Face recognition failed. Please login with your account or change your photo.",
//             });
//         }
//       } catch (error) {
//         // setError("Face recognition failed. Please try again.");
//         setIconColor("red");
//         if (onRecognitionResult)
//           onRecognitionResult({
//             status: "failed",
//             message:
//               error.response?.data?.message ||
//               "Error during face recognition. Please try again.",
//           });
//         stopCamera();
//       } finally {
//         setLoading(false);
//         if (onProcessingChange) onProcessingChange(false);
//       }
//     }, "image/jpeg");
//   };

//   // Auto-capture every 3 seconds when camera is active and not loading
//   useEffect(() => {
//     if (cameraActive && !loading) {
//       const interval = setInterval(captureAndRecognize, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [cameraActive, loading]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => stopCamera();
//   }, []);

//   return (
//     <div
//       className="cam d-flex justify-content-center align-items-center position-relative"
//       style={{ height: "50vh" }}
//     >
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         className="w-100"
//         style={{ height: "50vh", display: cameraActive ? "block" : "none" }}
//       />
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//       {loading && (
//         <div
//           className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
//           style={{ background: "#0008", top: 0, left: 0 }}
//         >
//           <div className="spinner-border text-light" role="status"></div>
//         </div>
//       )}
//       {error && (
//         <p
//           className="text-danger mt-2 position-absolute"
//           style={{ bottom: 10 }}
//         >
//           {error}
//         </p>
//       )}
//       <div className="position-absolute camBtn w-100 h-100">
//         {!cameraActive ? (
//           <button
//             onClick={startCamera}
//             aria-label="Start camera for face recognition"
//             className="w-100 h-100"
//           >
//             <div className="custum-file-upload w-100 h-100">
//               <div className="camIcon">
//                 <RiCameraLensFill
//                   className="fs-1 "
//                   style={{ color: iconColor }}
//                 />
//               </div>
//               <div className="text">
//                 <span style={{ color: iconColor }}>
//                   Click to Check Your Face Recognition
//                 </span>
//               </div>
//             </div>
//           </button>
//         ) : (
//           <button
//             onClick={stopCamera}
//             aria-label="Stop camera"
//             className="btn-close-camera"
//             disabled={loading}
//           >
//             <CgClose className="fs-1" style={{ color: "red" }} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FaceRecognition;
import * as faceapi from "face-api.js";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const FaceRecognition = ({ employeeId, employeeName, onRecognition }) => {
  const videoRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load face-api.js models
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    setMessage("");
    setFaceDetected(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      setMessage("Unable to access camera. Please check permissions.");
    }
  };

  const captureAndSend = async () => {
    setMessage("");
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

    // Detect faces in the captured image
    const detections = await faceapi.detectAllFaces(
      canvas,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (detections.length === 0) {
      setFaceDetected(false);
      setMessage("No face detected. Please try again.");
      if (onRecognition) onRecognition({ status: "failed", message: "No face detected." });
      return;
    }

    setFaceDetected(true);
    setMessage("Face detected! Sending data...");

    const imageBase64 = canvas.toDataURL("image/jpeg");

    try {
      await axios.post("/api/recognize", {
        employeeId,
        employeeName,
        imageBase64,
      });
      setMessage("Face recognition data sent successfully.");
      if (onRecognition) onRecognition({ status: "success" });
    } catch (error) {
      setMessage("Error sending data to backend.");
      if (onRecognition) onRecognition({ status: "failed", message: "Error sending data." });
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay width={320} height={240} />
      <div style={{ margin: "10px 0" }}>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={captureAndSend} disabled={!modelsLoaded}>
          Capture & Recognize
        </button>
      </div>
      {message && (
        <div style={{ color: faceDetected ? "green" : "red", marginTop: 10 }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
