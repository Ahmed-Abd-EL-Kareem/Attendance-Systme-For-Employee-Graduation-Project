import { LayoutDashboard, Menu } from "lucide-react";
import React, { useState } from "react";
import { adminDashBoard, employeeDashBoard } from "../Data/data";
import { FaAddressCard, FaPaste } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRightFromBracket } from "react-icons/fa6";
import { PiPasswordFill } from "react-icons/pi";
import axios from "axios";
import { toast } from "react-toastify";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [account, setAccount] = useState(true);
  const isActive = (path) => location.pathname.split("/")[2] === path;
  const isActive2 = (path) => location.pathname.split("/")[3] === path;
  const id = location.pathname.split("/")[2];

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/accounts/logout",
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        // حفظ reportId و reportExpiry مؤقتاً
        const reportId = localStorage.getItem("reportId");
        const reportExpiry = localStorage.getItem("reportExpiry");

        // مسح جميع البيانات من localStorage
        localStorage.clear();

        // إعادة reportId و reportExpiry إذا كانا موجودين
        if (reportId && reportExpiry) {
          localStorage.setItem("reportId", reportId);
          localStorage.setItem("reportExpiry", reportExpiry);
        }

        // إزالة جميع الكوكيز
        document.cookie.split(";").forEach((cookie) => {
          const [name] = cookie.trim().split("=");
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });

        toast.success("Logged out successfully", {
          theme: "colored",
        });

        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out", {
        theme: "colored",
      });
    }
  };

  const toggleSidebar = () => {
    setSideBar(!sideBar);
  };

  return (
    <>
      <div className="sideBar">
        <Menu
          className="menuBar position-absolute"
          style={
            sideBar
              ? { margin: " 12px 0 0 190px", color: "white" }
              : { margin: " 20px 0 0 15px", color: "white" }
          }
          onClick={toggleSidebar}
        />
        <div
          className={`dashboard text-light position-fixed ${
            sideBar ? "" : "hide"
          }`}
        >
          <div className="content">
            <img className="mt-2" src="/img/face-gate.png" alt="" />
            <div className=" ms-3 me-4 mt-3 ">
              {location.pathname.split("/")[1] === "admin" ? (
                <>
                  <h6 className="text-secondary fw-bold mb-4">Admin</h6>
                  <div className=" border-bottom">
                    <Link to={`/admin/${id}/dashboard`}>
                      <div
                        className={`box d-flex ms-2 mb-4 ${
                          isActive2("dashboard") ? "active" : "text-light"
                        }`}
                      >
                        <LayoutDashboard /> <p className="ms-2 ">Dashboard</p>
                      </div>
                    </Link>
                  </div>
                  <h6 className="text-secondary fw-bold my-4">Master</h6>
                  <ul className="my-4 border-bottom p-0">
                    {adminDashBoard.map((val, index) => {
                      return (
                        <Link
                          key={index}
                          to={`/admin/${id}/${val.text.toLowerCase()}`}
                        >
                          <li
                            className={`box d-flex ms-2 mb-4 ${
                              isActive2(`${val.text.toLowerCase()}`) ||
                              location.pathname.includes(
                                `${val.text.toLowerCase()}`
                              )
                                ? "active"
                                : "text-light"
                            }`}
                          >
                            {val.icon} <p className="ms-2">{val.text}</p>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                  <h6 className="text-secondary fw-bold my-4">Report</h6>
                  <Link to={`/admin/${id}/report`}>
                    <div className="border-bottom mb-4">
                      <div
                        className={`box d-flex ms-2 mb-4 ${
                          isActive2("report") ||
                          location.pathname.includes("report")
                            ? "active"
                            : "text-light"
                        }`}
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
                        <Link
                          key={index}
                          to={`/employee/${id}/${val.text.toLowerCase()}`}
                        >
                          <li
                            className={`box d-flex ms-2 mb-4 ${
                              isActive2(`${val.text.toLowerCase()}`)
                                ? "active"
                                : "text-light"
                            }`}
                          >
                            {val.icon} <p className="ms-2">{val.text}</p>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                  <h6 className="text-secondary fw-bold my-4">PROFILE</h6>
                  <Link to={`/employee/${id}/profile`}>
                    <div>
                      <div
                        className={`box d-flex ms-2 mb-4 ${
                          isActive2("profile") ? "active" : "text-light"
                        }`}
                      >
                        <FaAddressCard /> <p className="ms-2">My Profile</p>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/employee/${id}/change-password`}>
                    <div className="border-bottom">
                      <div
                        className={`box d-flex ms-2 mb-4 align-items-center ${
                          isActive2("change-password") ? "active" : "text-light"
                        }`}
                      >
                        <PiPasswordFill className="fs-5" />
                        <p className="ms-2">Change Password</p>
                      </div>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={sideBar ? "overlay" : ""}
          onClick={() => setSideBar(false)}
        ></div>
      </div>
      <div className="logOut">
        <button className="logout" onClick={handleLogout}>
          <div className="sign">
            <FaRightFromBracket />
          </div>
          <div className="text">Logout</div>
        </button>
      </div>
    </>
  );
};

export default Nav;
