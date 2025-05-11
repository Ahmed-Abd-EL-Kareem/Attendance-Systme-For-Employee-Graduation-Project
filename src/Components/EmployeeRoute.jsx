import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AttendanceForm from "./Employee/AttendanceForm/AttendanceForm";
import Profile from "./Employee/Profile/Profile";
import History from "./Employee/History/History";
import NotFound from "../notFound";
import NavBar from "./NavBar";
import ChangePassword from "./Employee/Profile/ChangePassword";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const EmployeeRoute = () => {
  const [employee, setEmployee] = useState(null);
  const fetchEmployeeData = async () => {
    try {
      const employeeId = JSON.parse(localStorage.getItem("employeeId"));
      if (!employeeId) {
        toast.error("Employee ID not found", {
          theme: "colored",
        });
        return;
      }

      const response = await axios.get(
        `https://attendancesystem-back-end-production.up.railway.app/api/v1/employees/${employeeId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        setEmployee(response.data.data.employee);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching employee data",
        {
          theme: "colored",
        }
      );
    }
  };
  useEffect(() => {
    fetchEmployeeData();
  }, []);
  return (
    <div className="d-flex">
      <NavBar />
      <Routes>
        <Route path="/attendance-form" element={<AttendanceForm />} />
        <Route path="/profile" element={<Profile employee={employee} />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/history" element={<History />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default EmployeeRoute;
