import React from "react";
import { Route, Routes } from "react-router-dom";
import AttendanceForm from "../Employee/AttendanceForm/AttendanceForm";
import Profile from "../Employee/Profile/Profile";
import History from "../Employee/History/History";
import NotFound from "../ui/notFound";
import NavBar from "../ui/NavBar";
import ChangePassword from "../Employee/Profile/ChangePassword";
import { useEmployee } from "../../hooks/useApiQueries";
import Loading from "../ui/Loading";

const EmployeeRoute = () => {
  // Get employee ID from localStorage
  const employeeId = JSON.parse(localStorage.getItem("employeeId"));

  // Use React Query hook to fetch employee data
  const { data: employee, isLoading, error } = useEmployee(employeeId);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !employee) {
    return <NotFound />;
  }
  return (
    <div className="d-flex">
      <NavBar />
      <Routes>
        <Route
          path="/attendance-form"
          element={<AttendanceForm employee={employee} />}
        />
        <Route path="/profile" element={<Profile employee={employee} />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/history" element={<History />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default EmployeeRoute;
