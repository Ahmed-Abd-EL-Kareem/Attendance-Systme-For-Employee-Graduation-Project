import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import NavBar from "./Components/NavBar";
import Dashboard from "./Components/Admin/Dashboard";
import Department from "./Components/Admin/Department/Department";
import AddDepart from "./Components/Admin/Department/AddDepart";
import EditDepart from "./Components/Admin/Department/EditDepart";
import Shift from "./Components/Admin/Shift/Shift";
import AddShift from "./Components/Admin/Shift/AddShift";
import EditShift from "./Components/Admin/Shift/EditShift";
import Employee from "./Components/Admin/Employee/Employee";
import AddEmp from "./Components/Admin/Employee/AddEmp";
import AttendanceForm from "./Components/Employee/AttendanceForm/AttendanceForm";
import EditEmp from "./Components/Admin/Employee/EditEmp";
import User from "./Components/Admin/Users/User";
import AddUsers from "./Components/Admin/Users/AddUsers";
import EditUsers from "./Components/Admin/Users/EditUser";
import Report from "./Components/Admin/Report/Report";
import Profile from "./Components/Employee/Profile/Profile";
import AOS from "aos";
import History from "./Components/Employee/History/History";
import Login from "./Components/Login";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Define routes where NavBar and the "d-flex" wrapper should be hidden
  const noWrapperRoutes = ["/"];

  // Check if the current path requires the wrapper
  const showWrapper = !noWrapperRoutes.includes(location.pathname);
  const showNavBar = showWrapper; // Navbar is shown when the wrapper is shown

  const content = (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/department" element={<Department />} />
      <Route path="/department/add" element={<AddDepart />} />
      <Route path="/department/edit/:id" element={<EditDepart />} />
      <Route path="/shift" element={<Shift />} />
      <Route path="/shift/add" element={<AddShift />} />
      <Route path="/shift/edit/:id" element={<EditShift />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/employee/add" element={<AddEmp />} />
      <Route path="/employee/edit/:id" element={<EditEmp />} />
      <Route path="/users" element={<User />} />
      <Route path="/users/add/:id" element={<AddUsers />} />
      <Route path="/users/edit/:id" element={<EditUsers />} />
      <Route path="/report" element={<Report />} />

      {/* Employee */}
      <Route path="/attendance-form" element={<AttendanceForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );

  return showWrapper ? (
    <div className="d-flex">
      {showNavBar && <NavBar />}
      {content}
    </div>
  ) : (
    content
  );
}

export default App;
