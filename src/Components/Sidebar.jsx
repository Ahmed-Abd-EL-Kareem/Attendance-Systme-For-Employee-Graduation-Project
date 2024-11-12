import { LayoutDashboard } from "lucide-react";
import React, { useState } from "react";
import { adminDashBoard } from "../data";
import { FaPaste } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashBoard = () => {
  // const [sideBar, setSideBar] = useState(true);
  const [active, setActive] = useState(0);
  return (
    <div className="sideBar">
      <div
        className="dashboard text-light position-fixed"
        // style={sideBar ? { display: "block" } : { display: "none" }}
      >
        <div className="content">
          <img src="/img/logo1.png" alt="" />
          <div className=" ms-3 me-4 mt-3 ">
            <h6 className="text-secondary fw-bold mb-4">Admin</h6>
            <div className=" border-bottom">
              <Link to={`/`}>
                <div
                  className={`box d-flex ms-2 mb-4 ${
                    active === 1 || active === 0 ? "active" : "text-light"
                  }`}
                  onClick={() => setActive(1)}
                >
                  <LayoutDashboard /> <p className="ms-2 ">Dashboard</p>
                </div>
              </Link>
            </div>

            <h6 className="text-secondary fw-bold my-4">Master</h6>
            <ul className="my-4 border-bottom p-0">
              {adminDashBoard.map((val, index) => {
                return (
                  <li
                    key={index}
                    className={`box d-flex ms-2 mb-4 ${
                      active === index + 2 ? "active" : "text-light"
                    }`}
                    onClick={() => setActive(index + 2)}
                  >
                    {val.icon} <p className="ms-2">{val.text}</p>
                  </li>
                );
              })}
            </ul>
            <h6 className="text-secondary fw-bold my-4">Report</h6>
            <div className="border-bottom">
              <div
                className={`box d-flex ms-2 mb-4 ${
                  active === -1 ? "active" : "text-light"
                }`}
                onClick={() => setActive(-1)}
              >
                <FaPaste /> <p className="ms-2">Print Report</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
