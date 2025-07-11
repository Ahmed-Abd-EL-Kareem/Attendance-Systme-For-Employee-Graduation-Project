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
import React, { useRef, useState, useEffect } from "react";
import { RiCameraLensFill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";
import * as faceapi from "face-api.js";

const FaceRecognition = ({
  onRecognitionResult,
  onProcessingChange,
  employeeId,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [iconColor, setIconColor] = useState("white");
  const [toggle, setToggle] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // Load face-api.js models once
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "https://attendance-system-mu.vercel.app/models";
      // const MODEL_URL = `${window.location.origin}/models`;
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (err) {
        console.error("Error loading models", err);
        setError("Failed to load face recognition models.");
      }
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    try {
      setError("");
      if (onProcessingChange) onProcessingChange(true);
      setToggle(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      setError("Camera access denied or not available");
      setCameraActive(false);
      setToggle(false);
      if (onRecognitionResult)
        onRecognitionResult({
          status: "failed",
          message: "Camera access denied or not available",
        });
      if (onProcessingChange) onProcessingChange(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setToggle(false);
    if (onProcessingChange) onProcessingChange(false);
  };

  const captureAndRecognize = async () => {
    console.log(">>> captureAndRecognize called");

    if (!videoRef.current || !canvasRef.current || !modelsLoaded) {
      console.warn("Missing refs or models not loaded");
      return;
    }

    const video = videoRef.current;

    // Ensure video is ready
    if (video.readyState < 2) {
      console.log("Waiting for video to be ready...");
      await new Promise((resolve) => {
        video.onloadeddata = () => resolve();
      });
    }

    setLoading(true);
    if (onProcessingChange) onProcessingChange(true);
    setError("");

    // Draw to canvas
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Detect face
    const detection = await faceapi.detectSingleFace(
      video,
      new faceapi.TinyFaceDetectorOptions()
    );
    console.log("Detection:", detection);

    if (!detection) {
      setError("No face detected. Please try again.");
      setIconColor("red");
      setLoading(false);
      if (onRecognitionResult)
        onRecognitionResult({
          status: "failed",
          message: "No face detected.",
        });
      if (onProcessingChange) onProcessingChange(false);
      return;
    }

    const imageBase64 = canvas.toDataURL("image/jpeg");

    if (!employeeId) {
      setError("Employee ID not provided");
      setLoading(false);
      if (onRecognitionResult)
        onRecognitionResult({
          status: "failed",
          message: "Employee ID not provided",
        });
      return;
    }

    try {
      const response = await axios.post(
        "https://90-attendance-system-back-end.vercel.app/api/v1/face-recognition/recognize",
        {
          employeeId,
          imageBase64,
        }
      );

      console.log("Response:", response.data);

      if (response.data.status === "success") {
        toast.success("Face recognition successful", { theme: "colored" });
        stopCamera();
        setIconColor("green");
        if (onRecognitionResult)
          onRecognitionResult({ status: "success", data: response.data });
      } else {
        stopCamera();
        setIconColor("red");
        if (onRecognitionResult)
          onRecognitionResult({
            status: "failed",
            message:
              "Face recognition failed. Please login with your account or change your photo.",
          });
      }
    } catch (error) {
      setIconColor("red");
      setError("Face recognition failed. Please try again.");
      if (onRecognitionResult)
        onRecognitionResult({
          status: "failed",
          message:
            error.response?.data?.message ||
            "Error during face recognition. Please try again.",
        });
      stopCamera();
    } finally {
      setLoading(false);
      if (onProcessingChange) onProcessingChange(false);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div
      className="cam d-flex justify-content-center align-items-center position-relative"
      style={{ height: "50vh" }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-100"
        style={{ height: "50vh", display: cameraActive ? "block" : "none" }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {loading && (
        <div
          className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "#0008", top: 0, left: 0 }}
        >
          <div className="spinner-border text-light" role="status"></div>
        </div>
      )}
      {error && (
        <p
          className="text-danger mt-2 position-absolute"
          style={{ bottom: 10 }}
        >
          {error}
        </p>
      )}
      <div className="position-absolute camBtn w-100 h-100">
        {!cameraActive ? (
          <button
            onClick={startCamera}
            aria-label="Start camera for face recognition"
            className="w-100 h-100"
          >
            <div className="custum-file-upload w-100 h-100">
              <div className="camIcon">
                <RiCameraLensFill
                  className="fs-1"
                  style={{ color: iconColor }}
                />
              </div>
              <div className="text">
                <span style={{ color: iconColor }}>
                  Click to Check Your Face Recognition
                </span>
              </div>
            </div>
          </button>
        ) : (
          <>
            <button
              onClick={stopCamera}
              aria-label="Stop camera"
              className="btn-close-camera"
              disabled={loading}
              style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
            >
              <CgClose className="fs-1" style={{ color: "red" }} />
            </button>
            <button
              onClick={captureAndRecognize}
              aria-label="Capture & Recognize"
              className="btn-capture-recognize"
              disabled={loading || !modelsLoaded}
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 2,
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: "0 2px 8px #0002",
              }}
            >
              Capture & Recognize
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
