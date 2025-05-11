import React, { useState, useEffect } from "react";
import MapBox from "./MapBox";
import Head from "../../Head";
import FaceRecognition from "./FaceRecognition";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AttendanceForm = () => {
  const [isLocationValid, setIsLocationValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    // عرض رسالة تسجيل الدخول
    const loginToast = localStorage.getItem("loginToast");
    if (loginToast) {
      const { message, type } = JSON.parse(loginToast);
      toast[type](message, {
        theme: "colored",
      });
      setTimeout(() => {
        localStorage.removeItem("loginToast");
      }, 6000);
    }

    // جلب معرف الموظف من التخزين المحلي
    const storedEmployeeId = localStorage.getItem("employeeId");
    if (storedEmployeeId) {
      setEmployeeId(JSON.parse(storedEmployeeId));
    }

    // التحقق من صلاحية معرف التقرير
    const reportId = localStorage.getItem("reportId");
    const reportExpiry = localStorage.getItem("reportExpiry");
    if (reportId && reportExpiry) {
      const expiryDate = new Date(reportExpiry);
      if (new Date() > expiryDate) {
        localStorage.removeItem("reportId");
        localStorage.removeItem("reportExpiry");
      }
    }
  }, []);

  const handleLocationChange = (insidePolygon) => {
    setIsLocationValid(insidePolygon);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(" ")[0];
  };

  const handleCheckIn = async () => {
    // if (!isLocationValid) return;
    setLoading(true);

    try {
      const response = await axios.post(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/reports",
        {
          date: new Date().toISOString().split("T")[0],
          notes: "",
          timeIn: getCurrentTime(),
          statusIn: "Checked",
          employee: employeeId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        toast.success("Check-in successful", {
          theme: "colored",
        });
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
    }
  };

  const handleCheckOut = async () => {
    // if (!isLocationValid) return;
    setLoading(true);

    try {
      const reportId = localStorage.getItem("reportId");
      const expiryDate = new Date(localStorage.getItem("reportExpiry"));

      if (!reportId || new Date() > expiryDate) {
        toast.error("No valid check-in found", {
          theme: "colored",
        });
        return;
      }

      const response = await axios.patch(
        `https://attendancesystem-back-end-production.up.railway.app/api/v1/reports/${reportId}`,
        {
          timeOut: getCurrentTime(),
          statusOut: "Checked",
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        toast.success("Check-out successful", {
          theme: "colored",
        });
        localStorage.removeItem("reportId");
        localStorage.removeItem("reportExpiry");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error checking out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="attendance w-100 mt-6">
        <div className="dash container">
          <Head title="Attendance Form" />
          <div className="box">
            <div className="content w-100 d-flex" style={{ height: "85%" }}>
              <div className="face w-50 p-4 position-relative">
                <FaceRecognition />
              </div>
              <div className="mapBox w-50 p-4" style={{ height: "100%" }}>
                <MapBox onLocationChange={handleLocationChange} />
              </div>
            </div>
            <div className="buttons gap-4 d-flex justify-content-center flex-direction-row px-3">
              <button
                type="button"
                className="button out col-md-4 col-lg-2"
                // className={
                //   !isLocationValid
                //     ? "button disabled col-md-4 col-lg-2"
                //     : "button out col-md-4 col-lg-2"
                // }
                // disabled={!isLocationValid || loading}
                onClick={handleCheckOut}
              >
                {loading ? "Processing..." : "Check Out"}
              </button>
              <button
                type="button"
                className="button in col-md-4 col-lg-2"
                // className={
                //   !isLocationValid
                //     ? "button disabled col-md-4 col-lg-2"
                //     : "button in col-md-4 col-lg-2"
                // }
                // disabled={!isLocationValid || loading}
                onClick={handleCheckIn}
              >
                {loading ? "Processing..." : "Check In"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AttendanceForm;
