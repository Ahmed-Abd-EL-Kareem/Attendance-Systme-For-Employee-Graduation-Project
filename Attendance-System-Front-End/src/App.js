import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import React, { useEffect } from "react";
// import NavBar from "./Components/NavBar";
// import AttendanceForm from "./Components/Employee/AttendanceForm/AttendanceForm";
// import Profile from "./Components/Employee/Profile/Profile";
import AOS from "aos";
// import History from "./Components/Employee/History/History";
import Login from "./Components/ui/Login";
import NotFound from "./Components/ui/notFound";
import NavBar from "./Components/ui/NavBar";
// Admin pages
import Dashboard from "./Components/Admin/Dashboard";
import Department from "./Components/Admin/Department/Department";
import AddDepart from "./Components/Admin/Department/AddDepart";
import EditDepart from "./Components/Admin/Department/EditDepart";
import Shift from "./Components/Admin/Shift/Shift";
import AddShift from "./Components/Admin/Shift/AddShift";
import EditShift from "./Components/Admin/Shift/EditShift";
import Employee from "./Components/Admin/Employee/Employee";
import AddEmp from "./Components/Admin/Employee/AddEmp";
import EditEmp from "./Components/Admin/Employee/EditEmp";
import User from "./Components/Admin/Users/User";
import AddUsers from "./Components/Admin/Users/AddUsers";
import EditUsers from "./Components/Admin/Users/EditUser";
import Report from "./Components/Admin/Report/Report";
// Employee pages
import AttendanceForm from "./Components/Employee/AttendanceForm/AttendanceForm";
import Profile from "./Components/Employee/Profile/Profile";
import ChangePassword from "./Components/Employee/Profile/ChangePassword";
import History from "./Components/Employee/History/History";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Admin layout with nested routes */}
          <Route
            path="/admin/:adminId"
            element={
              <div className="d-flex">
                <NavBar />
                <Outlet />
              </div>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="department" element={<Department />} />
            <Route path="department/add" element={<AddDepart />} />
            <Route path="department/edit/:id" element={<EditDepart />} />
            <Route path="shift" element={<Shift />} />
            <Route path="shift/add" element={<AddShift />} />
            <Route path="shift/edit/:id" element={<EditShift />} />
            <Route path="employee" element={<Employee />} />
            <Route path="employee/add" element={<AddEmp />} />
            <Route path="employee/edit/:id" element={<EditEmp />} />
            <Route path="users" element={<User />} />
            <Route path="users/add/:id" element={<AddUsers />} />
            <Route path="users/edit/:id" element={<EditUsers />} />
            <Route path="report" element={<Report />} />
          </Route>

          {/* Employee layout with nested routes */}
          <Route
            path="/employee/:employeeId"
            element={
              <div className="d-flex">
                <NavBar />
                <Outlet />
              </div>
            }
          >
            <Route path="attendance-form" element={<AttendanceForm />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// function AppContent() {
//   const location = useLocation();

//   // Define routes where NavBar and the "d-flex" wrapper should be hidden
//   const noWrapperRoutes = ["/", "/*"];

//   // Check if the current path requires the wrapper
//   const showWrapper = !noWrapperRoutes.includes(location.pathname);
//   const showNavBar = showWrapper; // Navbar is shown when the wrapper is shown

//   const content = (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/admin/:id/*" element={<Admin />} />
//       {/* <Route path="/attendance-form" element={<AttendanceForm />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/history" element={<History />} /> */}
//       <Route path="/employee/:id/*" element={<EmployeeRoute />} />
//       <Route path="/*" element={<NotFound />} />
//     </Routes>
//   );

//   return showWrapper ? (
//     <div className="d-flex">
//       {showNavBar && <NavBar />}
//       {content}
//     </div>
//   ) : (
//     content
//   );
// }

export default App;
