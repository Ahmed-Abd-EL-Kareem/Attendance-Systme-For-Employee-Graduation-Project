// import DashBoard from "./Components/DashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
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
function App() {
  // let params = useParams();
  // console.log(params);
  // "/dashboard/accounts"
  return (
    <>
      <div className="d-flex">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/department" element={<Department />} />
            <Route path="/department/add" element={<AddDepart />} />
            <Route path="/department/edit/:id" element={<EditDepart />} />
            {/* <Route path="/shift" element={<Shift />} />
            <Route path="/shift/add" element={<AddShift />} />
            <Route path="/shift/edit/:id" element={<EditShift />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/employee/add" element={<AddEmp />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer />bottom: 0;
    position: absolute; */}
    </>
  );
}

export default App;
