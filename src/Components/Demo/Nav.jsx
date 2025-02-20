// import { LayoutDashboard, Menu } from "lucide-react";
// import React, { useState } from "react";
// import { adminDashBoard } from "../../data";
// import { FaPaste } from "react-icons/fa";
// import { Link } from "react-router-dom";
// const DashBoard = () => {
//   const [sideBar, setSideBar] = useState(false);
//   const [active, setActive] = useState(0);
//   return (
//     <div className="sideBar position-relative start-0">
//       <div className="d-flex flex-row-reverse">
//         <Menu
//           style={{ margin: " 12px 0 0 15px", color: "white" }}
//           onClick={() => {
//             setSideBar(!sideBar);
//           }}
//         />
//         <div
//           className="dashboard text-light"
//           style={sideBar ? { display: "block" } : { display: "none" }}
//         >
//           <div className="content">
//             <img src="/img/logo.png" alt="" />
//             <div className=" ms-3 me-4 mt-3 ">
//               <h6 className="text-secondary fw-bold mb-4">Admin</h6>
//               <div className=" border-bottom">
//                 <Link to="/dashboard">
//                   <div
//                     className={`box d-flex ms-2 ${
//                       active === 1 || active === 0 ? "active" : "text-light"
//                     }`}
//                     onClick={() => setActive(1)}
//                   >
//                     <LayoutDashboard /> <p className="ms-2 ">Dashboard</p>
//                   </div>
//                 </Link>
//               </div>

//               <h6 className="text-secondary fw-bold my-4">Master</h6>
//               <ul className="my-4 ms-2 border-bottom p-0">
//                 {adminDashBoard.map((val, index) => {
//                   return (
//                     <li
//                       key={index}
//                       className={`box d-flex ms-2 ${
//                         active === index + 2 ? "active" : "text-light"
//                       }`}
//                       onClick={() => setActive(index + 2)}
//                     >
//                       {val.icon} <p className="ms-2">{val.text}</p>
//                     </li>
//                   );
//                 })}
//               </ul>
//               <div className="text-secondary fw-bold my-4">Report</div>
//               <div className="border-bottom">
//                 <div
//                   className={`box d-flex ms-2 ${
//                     active === -1 ? "active" : "text-light"
//                   }`}
//                   onClick={() => setActive(-1)}
//                 >
//                   <FaPaste /> <p className="ms-2">Print Report</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;
import { LayoutDashboard, Menu } from "lucide-react";
import React, { useState } from "react";
import { adminDashBoard, employeeDashBoard } from "../Data/data";
import { FaAddressCard, FaPaste } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FaRightFromBracket } from "react-icons/fa6";

const Nav = () => {
  const location = useLocation();
  // console.log(location.pathname.split("/")[1]);
  const [sideBar, setSideBar] = useState(false);
  const [account, setAccount] = useState(true);
  const isActive = (path) => location.pathname.split("/")[1] === path;

  return (
    <>
      <div className="sideBar">
        <Menu
          className="menuBar position-absolute"
          style={
            sideBar
              ? { margin: " 12px 0 0 190px", color: "white" }
              : { margin: " 12px 0 0 15px", color: "white" }
          }
          onClick={() => {
            setSideBar(!sideBar);
          }}
        />
        <div
          className={`dashboard text-light position-fixed ${
            sideBar ? "" : "hide"
          }`}
          // style={sideBar ? { display: "block" } : { display: "none" }}
        >
          <div className="content">
            <img className="mt-2" src="/img/face-gate.png" alt="" />
            <div className=" ms-3 me-4 mt-3 ">
              {account === true ? (
                <>
                  <h6 className="text-secondary fw-bold mb-4">Admin</h6>
                  <div className=" border-bottom">
                    <Link to={`/dashboard`}>
                      <div
                        className={`box d-flex ms-2 mb-4 ${
                          isActive("dashboard") ? "active" : "text-light"
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
                        <Link key={index} to={`/${val.text.toLowerCase()}`}>
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
                        <Link key={index} to={`/${val.text.toLowerCase()}`}>
                          <li
                            className={`box d-flex ms-2 mb-4 ${
                              isActive(`${val.text.toLowerCase()}`)
                                ? "active"
                                : "text-light"
                            }`}
                            // onClick={() => setActive(index)}
                          >
                            {val.icon} <p className="ms-2">{val.text}</p>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                  <h6 className="text-secondary fw-bold my-4">PROFILE</h6>
                  <Link to={`/profile`}>
                    <div className="border-bottom">
                      <div
                        className={`box d-flex ms-2 mb-4 ${
                          isActive("profile") ? "active" : "text-light"
                        }`}
                        // onClick={() => setActive(-1)}
                      >
                        <FaAddressCard /> <p className="ms-2">My Profile</p>
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
        <Link to={account === true ? "/attendance-form" : "/"}>
          <button className="logout" onClick={() => setAccount(!account)}>
            <div className="sign">
              <FaRightFromBracket />
            </div>
            <div className="text">Logout</div>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Nav;
