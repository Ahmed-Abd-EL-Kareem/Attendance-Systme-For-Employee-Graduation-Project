import React, { useEffect, useState } from "react";
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
import EditEmp from "./Components/Admin/Employee/EditEmp";
import User from "./Components/Admin/Users/User";
import AddUsers from "./Components/Admin/Users/AddUsers";
import EditUsers from "./Components/Admin/Users/EditUser";
import Report from "./Components/Admin/Report/Report";
import { Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./notFound";
import axios from "axios";
import Loading from "./Components/Loading";

const Admin = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lenEmp, setLenEmp] = useState("");
  const [lenDep, setLenDep] = useState("");
  const [lenShift, setLenShift] = useState("");
  const [lenAccount, setLenAccount] = useState("");
  const [empByDep, setEmpByDep] = useState([]);
  const [empByShift, setEmpByShift] = useState([]);

  // دالة لتحديث جميع البيانات
  const refreshData = async () => {
    try {
      // جلب بيانات الموظفين
      // const employeesResponse = await axios.get(
      //   "http://127.0.0.1:8000/api/v1/employees",
      //   { withCredentials: true }
      // );
      const employeesResponse = await axios.get(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/employees",
        { withCredentials: true }
      );
      setEmployees(employeesResponse.data.data.employees);
      setLenEmp(employeesResponse.data.results);

      // جلب بيانات الأقسام
      // const departmentsResponse = await axios.get(
      //   "http://127.0.0.1:8000/api/v1/departments",
      //   { withCredentials: true }
      // );
      const departmentsResponse = await axios.get(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/departments",
        { withCredentials: true }
      );
      setDepartments(departmentsResponse.data.data.departments);
      setLenDep(departmentsResponse.data.results);

      // جلب بيانات الورديات
      // const shiftsResponse = await axios.get(
      //   "http://127.0.0.1:8000/api/v1/shifts",
      //   { withCredentials: true }
      // );
      const shiftsResponse = await axios.get(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/shifts",
        { withCredentials: true }
      );
      setShifts(shiftsResponse.data.data.shifts);
      setLenShift(shiftsResponse.data.results);

      // جلب بيانات الحسابات
      // const accountsResponse = await axios.get(
      //   "http://127.0.0.1:8000/api/v1/accounts",
      //   { withCredentials: true }
      // );
      const accountsResponse = await axios.get(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/accounts",
        { withCredentials: true }
      );
      setAccounts(accountsResponse.data.data.accounts);
      setLenAccount(accountsResponse.data.results);

      // جلب بيانات التقارير
      // const reportsResponse = await axios.get(
      //   "http://127.0.0.1:8000/api/v1/reports",
      //   { withCredentials: true }
      // );
      const reportsResponse = await axios.get(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/reports",
        { withCredentials: true }
      );
      setReports(reportsResponse.data.data.reports);

      // جلب عدد الموظفين حسب القسم
      // const empByDepResponse = await axios.get(
      //   "http://127.0.0.1:8000/api/v1/employees/employee-counts-by-department",
      //   { withCredentials: true }
      // );
      const empByDepResponse = await axios.get(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/employees/employee-counts-by-department",
        { withCredentials: true }
      );
      setEmpByDep(empByDepResponse.data.data.counts);

      // جلب عدد الموظفين حسب الوردية
      // const empByShiftResponse = await axios.get(
      //   "http://127.0.0.1:8000/api/v1/employees/employee-counts-by-shift",
      //   { withCredentials: true }
      // );
      const empByShiftResponse = await axios.get(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/employees/employee-counts-by-shift",
        { withCredentials: true }
      );
      setEmpByShift(empByShiftResponse.data.data.counts);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    // // التحقق من وجود JWT في الكوكيز
    // const cookies = document.cookie.split(";");
    // const jwtCookie = cookies.find((cookie) =>
    //   cookie.trim().startsWith("jwt=")
    // );
    // console.log("All Cookies:", cookies);
    // console.log("JWT Cookie:", jwtCookie);

    refreshData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="d-flex">
      <NavBar />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              lenEmp={lenEmp}
              lenDep={lenDep}
              lenShift={lenShift}
              lenAccount={lenAccount}
              empByDep={empByDep}
              empByShift={empByShift}
              id={id}
            />
          }
        />
        <Route
          path="/department"
          element={<Department departments={departments} id={id} />}
        />
        <Route
          path="/department/add"
          element={<AddDepart onUpdateSuccess={refreshData} id={id} />}
        />
        <Route
          path="/department/edit/:id"
          element={<EditDepart onUpdateSuccess={refreshData} id1={id} />}
        />
        <Route path="/shift" element={<Shift shifts={shifts} id={id} />} />
        <Route
          path="/shift/add"
          element={<AddShift onUpdateSuccess={refreshData} id={id} />}
        />
        <Route
          path="/shift/edit/:id"
          element={<EditShift onUpdateSuccess={refreshData} id1={id} />}
        />
        <Route
          path="/employee"
          element={
            <Employee
              employees={employees}
              shifts={shifts}
              departments={departments}
              id={id}
            />
          }
        />
        <Route
          path="/employee/add"
          element={
            <AddEmp
              departments={departments}
              shifts={shifts}
              onUpdateSuccess={refreshData}
              id={id}
            />
          }
        />
        <Route
          path="/employee/edit/:id"
          element={
            <EditEmp
              EmpDepartments={departments}
              EmpShifts={shifts}
              onUpdateSuccess={refreshData}
              id1={id}
            />
          }
        />
        <Route path="/users" element={<User employees={employees} />} />
        <Route
          path="/users/add/:id"
          element={<AddUsers onUpdateSuccess={refreshData} id1={id} />}
        />
        <Route path="/users/edit/:id" element={<EditUsers id1={id} />} />
        <Route
          path="/report"
          element={<Report reportData={reports} departments={departments} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Admin;
