import { LayoutDashboard } from "lucide-react";
import React, { useState } from "react";
import { adminDashBoard, employeeDashBoard } from "./Data/data";
import { FaAddressCard, FaPaste } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const DashBoard = () => {
  const location = useLocation();
  // console.log(location.pathname.split("/")[1]);
  // const [sideBar, setSideBar] = useState(true);
  const [account, setAccount] = useState("admin");
  const isActive = (path) => location.pathname.split("/")[1] === path;

  return (
    <div className="sideBar">
      <div
        className="dashboard text-light position-fixed"
        // style={sideBar ? { display: "block" } : { display: "none" }}
      >
        <div className="content">
          <img src="/img/logo1.png" alt="" />
          <div className=" ms-3 me-4 mt-3 ">
            {account === "admin" ? (
              <>
                <h6 className="text-secondary fw-bold mb-4">Admin</h6>
                <div className=" border-bottom">
                  <Link to={`/`}>
                    <div
                      className={`box d-flex ms-2 mb-4 ${
                        isActive("") ? "active" : "text-light"
                      }`}
                      // onClick={() => setActive1("/")}
                    >
                      <LayoutDashboard /> <p className="ms-2 ">Dashboard</p>
                    </div>
                  </Link>
                </div>
                <h6 className="text-secondary fw-bold my-4">Master</h6>
                <ul className="my-4 border-bottom p-0">
                  {adminDashBoard.map((val, index) => {
                    return (
                      <Link to={`/${val.text.toLowerCase()}`}>
                        <li
                          key={index}
                          className={`box d-flex ms-2 mb-4 ${
                            isActive(`${val.text.toLowerCase()}`) ||
                            location.pathname.includes(
                              `${val.text.toLowerCase()}`
                            )
                              ? "active"
                              : "text-light"
                          }`}
                          // onClick={() => setActive1(location.pathname)}
                        >
                          {val.icon} <p className="ms-2">{val.text}</p>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
                <h6 className="text-secondary fw-bold my-4">Report</h6>
                <Link to={`/report`}>
                  <div className="border-bottom">
                    <div
                      className={`box d-flex ms-2 mb-4 ${
                        isActive("report") ||
                        location.pathname.includes("report")
                          ? "active"
                          : "text-light"
                      }`}
                      // onClick={() => setActive(-1)}
                    >
                      <FaPaste /> <p className="ms-2">Print Report</p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <h6 className="text-secondary fw-bold my-4">ATTENDANCE</h6>
                <ul className="my-4 border-bottom p-0">
                  {employeeDashBoard.map((val, index) => {
                    return (
                      <li
                        key={index}
                        className={`box d-flex ms-2 mb-4 ${
                          isActive(`/${val.text.toLowerCase()}`)
                            ? "active"
                            : "text-light"
                        }`}
                        // onClick={() => setActive(index)}
                      >
                        {val.icon} <p className="ms-2">{val.text}</p>
                      </li>
                    );
                  })}
                </ul>
                <h6 className="text-secondary fw-bold my-4">PROFILE</h6>
                <div className="border-bottom">
                  <div
                    className={`box d-flex ms-2 mb-4 ${
                      isActive("/profile") ? "active" : "text-light"
                    }`}
                    // onClick={() => setActive(-1)}
                  >
                    <FaAddressCard /> <p className="ms-2">My Profile</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default DashBoard;
