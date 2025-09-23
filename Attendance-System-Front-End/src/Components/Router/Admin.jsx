import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../ui/NavBar";
import Dashboard from "../Admin/Dashboard";
import Department from "../Admin/Department/Department";
import AddDepart from "../Admin/Department/AddDepart";
import EditDepart from "../Admin/Department/EditDepart";
import Shift from "../Admin/Shift/Shift";
import AddShift from "../Admin/Shift/AddShift";
import EditShift from "../Admin/Shift/EditShift";
import Employee from "../Admin/Employee/Employee";
import AddEmp from "../Admin/Employee/AddEmp";
import EditEmp from "../Admin/Employee/EditEmp";
import User from "../Admin/Users/User";
import AddUsers from "../Admin/Users/AddUsers";
import EditUsers from "../Admin/Users/EditUser";
import Report from "../Admin/Report/Report";
import NotFound from "../ui/notFound";
import Loading from "../ui/Loading";
import {
  useEmployees,
  useDepartments,
  useShifts,
  useAccounts,
  useReports,
  useEmployeeCountsByDepartment,
  useEmployeeCountsByShift,
  useDashboardCounts,
} from "../../hooks/useApiQueries";
import { useQueryClient } from "@tanstack/react-query";
import { apiService } from "../../services/api";
import { queryKeys } from "../../hooks/useApiQueries";

const Admin = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const queryClient = useQueryClient();

  // Only enable heavy queries when not on dashboard route
  const isOnDashboard = location.pathname.endsWith("/dashboard");

  // Lightweight dashboard counts (from /dashboard API)
  const { data: dashboardCounts } = useDashboardCounts({
    enabled: isOnDashboard,
  });

  // Use React Query hooks for data fetching
  const {
    data: employees = [],
    isLoading: employeesLoading,
    error: employeesError,
  } = useEmployees({ enabled: !isOnDashboard });

  const {
    data: departments = [],
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useDepartments({ enabled: !isOnDashboard });

  const {
    data: shifts = [],
    isLoading: shiftsLoading,
    error: shiftsError,
  } = useShifts({ enabled: !isOnDashboard });

  const {
    data: accounts = [],
    isLoading: accountsLoading,
    error: accountsError,
  } = useAccounts({ enabled: !isOnDashboard });

  const {
    data: reports = [],
    isLoading: reportsLoading,
    error: reportsError,
  } = useReports({}, { enabled: !isOnDashboard });

  const {
    data: empByDep = [],
    isLoading: empByDepLoading,
    error: empByDepError,
  } = useEmployeeCountsByDepartment({ enabled: isOnDashboard });

  const {
    data: empByShift = [],
    isLoading: empByShiftLoading,
    error: empByShiftError,
  } = useEmployeeCountsByShift({ enabled: isOnDashboard });

  // Calculate counts
  const lenEmp = isOnDashboard
    ? dashboardCounts?.employee ?? 0
    : employees.length;
  const lenDep = isOnDashboard
    ? dashboardCounts?.department ?? 0
    : departments.length;
  const lenShift = isOnDashboard ? dashboardCounts?.shift ?? 0 : shifts.length;
  const lenAccount = isOnDashboard
    ? dashboardCounts?.user ?? 0
    : accounts.length;

  // Check if any data is still loading
  const isLoading = isOnDashboard
    ? !dashboardCounts || empByDepLoading || empByShiftLoading
    : employeesLoading ||
      departmentsLoading ||
      shiftsLoading ||
      accountsLoading ||
      reportsLoading ||
      empByDepLoading ||
      empByShiftLoading;

  // After dashboard loads, prefetch all other routes' data in background
  useEffect(() => {
    if (isOnDashboard && !isLoading && dashboardCounts) {
      queryClient.prefetchQuery({
        queryKey: queryKeys.employees,
        queryFn: () => apiService.employees.getAll(),
        staleTime: 5 * 60 * 1000,
      });
      queryClient.prefetchQuery({
        queryKey: queryKeys.departments,
        queryFn: () => apiService.departments.getAll(),
        staleTime: 5 * 60 * 1000,
      });
      queryClient.prefetchQuery({
        queryKey: queryKeys.shifts,
        queryFn: () => apiService.shifts.getAll(),
        staleTime: 5 * 60 * 1000,
      });
      queryClient.prefetchQuery({
        queryKey: queryKeys.accounts,
        queryFn: () => apiService.accounts.getAll(),
        staleTime: 5 * 60 * 1000,
      });
      queryClient.prefetchQuery({
        queryKey: queryKeys.reports({}),
        queryFn: () => apiService.reports.getAll({}),
        staleTime: 2 * 60 * 1000,
      });
      queryClient.prefetchQuery({
        queryKey: queryKeys.employeeCountsByDepartment,
        queryFn: () => apiService.employees.getCountsByDepartment(),
        staleTime: 10 * 60 * 1000,
      });
      queryClient.prefetchQuery({
        queryKey: queryKeys.employeeCountsByShift,
        queryFn: () => apiService.employees.getCountsByShift(),
        staleTime: 10 * 60 * 1000,
      });
    }
  }, [isOnDashboard, isLoading, dashboardCounts, queryClient]);

  // Check if there are any errors
  const hasError =
    employeesError ||
    departmentsError ||
    shiftsError ||
    accountsError ||
    reportsError ||
    empByDepError ||
    empByShiftError;

  useEffect(() => {
    // Setup axios defaults
    axios.defaults.withCredentials = true;
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
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
        <Route path="/department/add" element={<AddDepart id={id} />} />
        <Route path="/department/edit/:id" element={<EditDepart id1={id} />} />
        <Route path="/shift" element={<Shift shifts={shifts} id={id} />} />
        <Route path="/shift/add" element={<AddShift id={id} />} />
        <Route path="/shift/edit/:id" element={<EditShift id1={id} />} />
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
          element={<AddEmp departments={departments} shifts={shifts} id={id} />}
        />
        <Route
          path="/employee/edit/:id"
          element={
            <EditEmp EmpDepartments={departments} EmpShifts={shifts} id1={id} />
          }
        />
        <Route path="/users" element={<User employees={employees} />} />
        <Route path="/users/add/:id" element={<AddUsers id1={id} />} />
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
