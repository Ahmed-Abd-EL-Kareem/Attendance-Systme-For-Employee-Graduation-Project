// import DashBoard from "./Components/DashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import NavBar from "./Components/NavBar";
import Dashboard from "./Components/Admin/Dashboard";
import Department from "./Components/Admin/Department/Department";
import AddDepart from "./Components/Admin/Department/AddDepart";
import EditDepart from "./Components/Admin/Department/EditDepart";
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
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer />bottom: 0;
    position: absolute; */}
    </>
  );
}

export default App;
