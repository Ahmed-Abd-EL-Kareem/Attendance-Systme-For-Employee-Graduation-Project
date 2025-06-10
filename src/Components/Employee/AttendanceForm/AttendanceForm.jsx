import React, { useState, useEffect, useCallback } from "react";
import MapBox from "./MapBox";
import Head from "../../Head";
import FaceRecognition from "./FaceRecognition";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AttendanceForm = () => {
  const [isLocationValid, setIsLocationValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [isFaceRecognized, setIsFaceRecognized] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loginToast = localStorage.getItem("loginToast");
    if (loginToast) {
      const { message, type } = JSON.parse(loginToast);
      toast[type](message, { theme: "colored" });
      setTimeout(() => localStorage.removeItem("loginToast"), 6000);
    }
    const storedEmployeeId = localStorage.getItem("employeeId");
    if (storedEmployeeId) {
      setEmployeeId(JSON.parse(storedEmployeeId));
    }
    const reportId = localStorage.getItem("reportId");
    const reportExpiry = localStorage.getItem("reportExpiry");
    if (reportId && reportExpiry) {
      if (new Date() > new Date(reportExpiry)) {
        localStorage.removeItem("reportId");
        localStorage.removeItem("reportExpiry");
      }
    }
  }, []);

  const handleFaceRecognition = useCallback((result) => {
    if (result.status === "success") {
      // toast.success("Face recognized successfully!", { theme: "colored" });
      setEmployeeId(result.data.employee_id);
      setEmployeeName(result.data.employee_name);
      setIsFaceRecognized(true);
      setVerificationStatus("success");
    } else {
      setVerificationStatus("failed");
      setIsFaceRecognized(false);
      toast.error("Face recognition failed. Please try again.", {
        theme: "colored",
      });
    }
  }, []);

  const handleLocationChange = useCallback(
    (insidePolygon) => {
      setIsLocationValid(insidePolygon);
      if (insidePolygon && isFaceRecognized) {
        toast.success("Location verified successfully!", { theme: "colored" });
      }
    },
    [isFaceRecognized]
  );

  const getCurrentTime = () => {
    return new Date().toTimeString().split(" ")[0];
  };

  const isFormValid = useCallback(
    () => {
      return true;
      // && isLocationValid && !isProcessing;
    },
    [
      // isFaceRecognized
    ]
  );

  const handleCheckIn = async () => {
    if (!isFormValid()) {
      const missingRequirements = [];
      if (!isFaceRecognized) missingRequirements.push("face recognition");
      if (!isLocationValid) missingRequirements.push("location verification");
      if (isProcessing) missingRequirements.push("processing");

      toast.error(`Please complete: ${missingRequirements.join(", ")}`, {
        theme: "colored",
      });
      return;
    }

    setLoading(true);
    setIsProcessing(true);
    try {
      const response = await axios.post(
        "https://90-attendance-system-back-end.vercel.app/api/v1/reports",
        {
          date: new Date().toISOString().split("T")[0],
          notes: "",
          timeIn: getCurrentTime(),
          statusIn: "Checked",
          employee: employeeId,
        },
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        toast.success("Check-in successful", { theme: "colored" });
        const reportId = response.data.data.report._id;
        localStorage.setItem("reportId", reportId);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 12);
        localStorage.setItem("reportExpiry", expiryDate.toISOString());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error checking in", {
        theme: "colored",
      });
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  const handleCheckOut = async () => {
    if (!isFormValid()) {
      const missingRequirements = [];
      if (!isFaceRecognized) missingRequirements.push("face recognition");
      if (!isLocationValid) missingRequirements.push("location verification");
      if (isProcessing) missingRequirements.push("processing");

      toast.error(`Please complete: ${missingRequirements.join(", ")}`, {
        theme: "colored",
      });
      return;
    }

    setLoading(true);
    setIsProcessing(true);
    try {
      const reportId = localStorage.getItem("reportId");
      const reportExpiry = localStorage.getItem("reportExpiry");
      if (!reportId || new Date() > new Date(reportExpiry)) {
        toast.error("No valid check-in found", { theme: "colored" });
        return;
      }
      const response = await axios.patch(
        `https://90-attendance-system-back-end.vercel.app/api/v1/reports/${reportId}`,
        {
          timeOut: getCurrentTime(),
          statusOut: "Checked",
        },
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        toast.success("Check-out successful", { theme: "colored" });
        localStorage.removeItem("reportId");
        localStorage.removeItem("reportExpiry");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error checking out", {
        theme: "colored",
      });
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="attendance w-100 mt-6">
        <div className="dash container">
          <Head title="Attendance Form" />
          <div className="box">
            <div
              className="content mb-4 w-100 d-flex"
              style={{ height: "75%" }}
            >
              <div className="face w-50 p-4 position-relative">
                <FaceRecognition
                  onRecognitionResult={handleFaceRecognition}
                  onProcessingChange={setIsProcessing}
                  employeeId={employeeId}
                />
              </div>
              <div className="mapBox w-50 p-4" style={{ height: "100%" }}>
                <MapBox onLocationChange={handleLocationChange} />
              </div>
            </div>

            <div className="buttons gap-4 d-flex justify-content-center flex-direction-row px-3">
              <button
                type="button"
                className={`button out col-md-4 col-lg-2 ${
                  !isFormValid() ? "disabled disabled-no-hover" : ""
                }`}
                disabled={!isFormValid()}
                onClick={handleCheckOut}
              >
                {loading ? "Processing..." : "Check Out"}
              </button>
              <button
                type="button"
                className={`button in col-md-4 col-lg-2 ${
                  !isFormValid() ? "disabled disabled-no-hover" : ""
                }`}
                disabled={!isFormValid()}
                onClick={handleCheckIn}
              >
                {loading ? "Processing..." : "Check In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceForm;
