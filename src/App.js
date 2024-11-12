// import DashBoard from "./Components/DashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import NavBar from "./Components/NavBar";
import Dashboard from "./Components/Dashboard";
function App() {
  return (
    <>
      <div className="d-flex">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer />bottom: 0;
    position: absolute; */}
    </>
  );
}

export default App;
