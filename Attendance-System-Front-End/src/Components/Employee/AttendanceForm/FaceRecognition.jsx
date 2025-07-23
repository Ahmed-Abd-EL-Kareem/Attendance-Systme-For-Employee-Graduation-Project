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
  registeredImageUrl,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [iconColor, setIconColor] = useState("white");
  const [toggle, setToggle] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [registeredDescriptor, setRegisteredDescriptor] = useState(null);

  // تحميل النماذج عند أول تحميل
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (err) {
        setError("فشل تحميل نماذج التعرف على الوجه");
      }
    };
    loadModels();
  }, []);

  // تحميل واستخراج بصمة صورة الموظف المسجلة
  useEffect(() => {
    const getRegisteredDescriptor = async () => {
      if (!registeredImageUrl || !modelsLoaded) return;
      try {
        const img = await faceapi.fetchImage(registeredImageUrl);
        const detection = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detection) {
          setRegisteredDescriptor(detection.descriptor);
        } else {
          setError("لم يتم العثور على وجه في صورة الموظف المسجلة");
        }
      } catch (err) {
        setError("خطأ في معالجة صورة الموظف المسجلة");
      }
    };
    getRegisteredDescriptor();
  }, [registeredImageUrl, modelsLoaded]);

  useEffect(() => {}, [registeredImageUrl]);
  useEffect(() => {}, [modelsLoaded]);

  // Start camera
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

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setToggle(false);
    if (onProcessingChange) onProcessingChange(false);
  };

  // تعديل captureAndRecognize ليستخدم face-api.js للمقارنة
  const captureAndRecognize = async () => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      !modelsLoaded ||
      !registeredDescriptor
    )
      return;
    setLoading(true);
    if (onProcessingChange) onProcessingChange(true);
    setError("");
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // استخراج بصمة الوجه من الصورة الملتقطة
    const detection = await faceapi
      .detectSingleFace(canvas)
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (!detection) {
      setError("لم يتم العثور على وجه. حاول مرة أخرى.");
      setIconColor("red");
      setLoading(false);
      if (onRecognitionResult)
        onRecognitionResult({
          status: "failed",
          message: "لم يتم العثور على وجه.",
        });
      if (onProcessingChange) onProcessingChange(false);
      return;
    }
    // المقارنة بين البصمتين
    const distance = faceapi.euclideanDistance(
      registeredDescriptor,
      detection.descriptor
    );
    const isMatch = distance < 0.6;
    if (isMatch) {
      setIconColor("green");
      stopCamera();
      if (onRecognitionResult)
        onRecognitionResult({ status: "success", data: { match: true } });
    } else {
      setIconColor("red");
      stopCamera();
      if (onRecognitionResult)
        onRecognitionResult({
          status: "failed",
          message: "لم يتم التعرف على الوجه.",
        });
    }
    setLoading(false);
    if (onProcessingChange) onProcessingChange(false);
  };

  // Auto-capture every 3 seconds when camera is active and not loading
  useEffect(() => {
    if (cameraActive && !loading) {
      const interval = setInterval(captureAndRecognize, 3000);
      return () => clearInterval(interval);
    }
  }, [cameraActive, loading]);

  // Cleanup on unmount
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
                  className="fs-1 "
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
          <button
            onClick={stopCamera}
            aria-label="Stop camera"
            className="btn-close-camera"
            disabled={loading}
          >
            <CgClose className="fs-1" style={{ color: "red" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
