import axios from "axios";
import React, { useEffect, useState } from "react";
// import { TbLogout } from "react-icons/tb";
// import { Menu } from "lucide-react";
// import Sidebar from "./Sidebar";

const Header = () => {
  const [employee, setEmployee] = useState([]);
  const fetchEmployee = async () => {
    const employeeId = localStorage.getItem("employeeId");
    const response = await axios.get(
      `https://attendancesystem-back-end-production.up.railway.app/api/v1/employees/${JSON.parse(
        employeeId
      )}`,
      { withCredentials: true }
    );
    setEmployee(response.data.data.employee);
    // console.log("employee", response.data.data.employee);
  };
  useEffect(() => {
    fetchEmployee();
    // console.log("employee", employee);
  }, []);
  return (
    <header className="header w-100 position-absolute">
      <div className="content d-flex justify-content-end py-2 px-4">
        <div className=" d-flex flex-row justify-content-end align-items-center py-1 bg-transparent text-light">
          <div className="card">
            <p>{employee.name}</p>
          </div>
          <img src={employee.image} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
