import React, { useState, useEffect, useCallback } from "react";
import FaceRecognition from "./FaceRecognition";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapBox from "./MapBox";
import Head from "../../ui/Head";
import Loading from "../../ui/Loading";
import { useParams } from "react-router-dom";
import {
  useEmployee,
  useTimeIn,
  useTimeOut,
} from "../../../hooks/useApiQueries";

const AttendanceForm = () => {
  const [isLocationValid, setIsLocationValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [isFaceRecognized, setIsFaceRecognized] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [isProcessing, setIsProcessing] = useState(false);

  const { employeeId: idFromRoute } = useParams();
  const {
    data: employee,
    isLoading: employeeLoading,
    error,
  } = useEmployee(
    idFromRoute || JSON.parse(localStorage.getItem("employeeId"))
  );
  const timeInMutation = useTimeIn();
  const timeOutMutation = useTimeOut();

  useEffect(() => {
    const loginToast = localStorage.getItem("loginToast");
    if (loginToast) {
      const { message, type } = JSON.parse(loginToast);
      toast[type](message, { theme: "colored" });
      // Remove immediately after showing to prevent duplicate toasts
      localStorage.removeItem("loginToast");
    }
    const effectiveId =
      idFromRoute || JSON.parse(localStorage.getItem("employeeId"));
    if (effectiveId) setEmployeeId(effectiveId);
  }, []);

  const handleFaceRecognition = useCallback((result) => {
    if (result.status === "success" && result.data?.match) {
      setIsFaceRecognized(true);
      setVerificationStatus("success");
      toast.success("Face recognized successfully!", { theme: "colored" });
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
      if (insidePolygon && isFaceRecognized && !isLocationValid) {
        toast.success("Location verified successfully!", { theme: "colored" });
      }
    },
    [isFaceRecognized, isLocationValid]
  );

  const getCurrentTime = () => {
    return new Date().toTimeString().split(" ")[0];
  };

  const isFormValid = useCallback(() => {
    // return true;
    // return isFaceRecognized && isLocationValid && !isProcessing;
    return isFaceRecognized && !isProcessing;
    // && isLocationValid && !isProcessing;
  }, [isFaceRecognized, isLocationValid, isProcessing]);

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
      await timeInMutation.mutateAsync({ employeeId });
    } catch (e) {
      // Toast handled in hook
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
      await timeOutMutation.mutateAsync({ employeeId });
    } catch (e) {
      // Toast handled in hook
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  // استخراج رابط صورة الموظف
  const employeePhoto = employee?.image || null;

  if (employeeLoading) return <Loading />;
  if (error) {
    return (
      <div className="attendance w-100 mt-6">
        <div className="dash container">
          <Head title="Attendance Form" />
          <div className="alert alert-danger">Failed to load employee data</div>
        </div>
      </div>
    );
  }

  // (إزالة جميع console.log)

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
                {employeePhoto ? (
                  <FaceRecognition
                    onRecognitionResult={handleFaceRecognition}
                    onProcessingChange={setIsProcessing}
                    employeeId={employeeId}
                    registeredImageUrl={employeePhoto}
                  />
                ) : (
                  <div className="alert alert-warning">
                    No registered photo for this employee!
                  </div>
                )}
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
