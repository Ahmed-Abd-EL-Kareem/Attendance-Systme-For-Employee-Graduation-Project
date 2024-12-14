import React, { useRef, useState } from "react";

const FaceRecognition = ({ onFaceRecognition }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    videoRef.current.srcObject = null;
    setIsCameraOn(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    // Set canvas dimensions to video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data from canvas
    const imageData = canvas.toDataURL("image/png");

    // Send imageData to face recognition model
    onFaceRecognition(imageData);
  };

  return (
    <div>
      <div>
        {isCameraOn ? (
          <video
            ref={videoRef}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        ) : (
          <button onClick={startCamera}>Start Camera</button>
        )}
        {isCameraOn && <button onClick={stopCamera}>Stop Camera</button>}
      </div>
      <div>
        {isCameraOn && <button onClick={captureImage}>Capture Image</button>}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default FaceRecognition;
