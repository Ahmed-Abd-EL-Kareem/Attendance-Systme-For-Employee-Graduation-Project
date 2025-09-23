import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
// import NavBar from "./Components/NavBar";
// import AttendanceForm from "./Components/Employee/AttendanceForm/AttendanceForm";
// import Profile from "./Components/Employee/Profile/Profile";
import AOS from "aos";
// import History from "./Components/Employee/History/History";
import Login from "./Components/ui/Login";
import NotFound from "./Components/ui/notFound";
import Admin from "./Components/Router/Admin";
import EmployeeRoute from "./Components/Router/EmployeeRoute";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* <AppContent /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/:id/*" element={<Admin />} />
          <Route path="/employee/:id/*" element={<EmployeeRoute />} />
          {/* <Route path="/attendance-form" element={<AttendanceForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} /> 
       <Route path="/*" element={<NotFound />} />
      */}
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
