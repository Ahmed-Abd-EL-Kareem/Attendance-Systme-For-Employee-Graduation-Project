import React, { useEffect } from "react";
import { ArrowRightLeft, Building } from "lucide-react";
import { FaClipboardUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import Head from "../ui/Head";
import DashCard from "./DashCard";
import Loading from "../ui/Loading";
import {
  useDashboardCounts,
  useEmployeeCountsByDepartment,
  useEmployeeCountsByShift,
} from "../../hooks/useApiQueries";
import { useQueryClient } from "@tanstack/react-query";
import { apiService } from "../../services/api";
import { queryKeys } from "../../hooks/useApiQueries";

const Dashboard = () => {
  const { adminId: id } = useParams();

  const { data: dashboardCounts, isLoading: dashboardLoading } =
    useDashboardCounts();
  const { data: empByDep = [], isLoading: empByDepLoading } =
    useEmployeeCountsByDepartment();
  const { data: empByShift = [], isLoading: empByShiftLoading } =
    useEmployeeCountsByShift();
  const queryClient = useQueryClient();

  const lenEmp = dashboardCounts?.employee ?? 0;
  const lenDep = dashboardCounts?.department ?? 0;
  const lenShift = dashboardCounts?.shift ?? 0;
  const lenAccount = dashboardCounts?.user ?? 0;
  useEffect(() => {
    // التحقق من وجود رسالة Toast مخزنة
    const storedToast = localStorage.getItem("loginToast");
    if (storedToast) {
      const { message, type } = JSON.parse(storedToast);
      if (type === "success") {
        toast.success(message, {
          theme: "colored",
        });
      }
      // حذف الرسالة من localStorage فوراً بعد عرضها
      localStorage.removeItem("loginToast");
    }

    // no-op
  }, []);

  // After dashboard loads, prefetch other resources sequentially (one by one)
  useEffect(() => {
    const prefetchSequentially = async () => {
      try {
        if (!dashboardCounts) return;
        // Employees
        await queryClient.prefetchQuery({
          queryKey: queryKeys.employees,
          queryFn: () => apiService.employees.getAll(),
          staleTime: 5 * 60 * 1000,
        });
        // Departments
        await queryClient.prefetchQuery({
          queryKey: queryKeys.departments,
          queryFn: () => apiService.departments.getAll(),
          staleTime: 5 * 60 * 1000,
        });
        // Shifts
        await queryClient.prefetchQuery({
          queryKey: queryKeys.shifts,
          queryFn: () => apiService.shifts.getAll(),
          staleTime: 5 * 60 * 1000,
        });
        // Accounts
        await queryClient.prefetchQuery({
          queryKey: queryKeys.accounts,
          queryFn: () => apiService.accounts.getAll(),
          staleTime: 5 * 60 * 1000,
        });
        // Reports (no params => default set)
        await queryClient.prefetchQuery({
          queryKey: queryKeys.reports({}),
          queryFn: () => apiService.reports.getAll({}),
          staleTime: 2 * 60 * 1000,
        });
      } catch (e) {
        // ignore prefetch errors to avoid blocking UI
      }
    };

    prefetchSequentially();
  }, [dashboardCounts, queryClient]);

  // Block UI until all dashboard data fully loaded
  if (dashboardLoading || empByDepLoading || empByShiftLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="dashboards mt-6 w-100">
        <div className="container">
          <Head title="Dashboard" />
          <div className="cards">
            <Link to={`/admin/${id}/department`}>
              <DashCard
                text="Department"
                count={`${lenDep}`}
                icon={<Building />}
                color="#d22828"
              />
            </Link>
            <Link to={`/admin/${id}/shift`}>
              <DashCard
                text="Shift"
                count={`${lenShift}`}
                icon={<ArrowRightLeft />}
                color="#0abf45"
              />
            </Link>
            <Link to={`/admin/${id}/employee`}>
              <DashCard
                text="Employee"
                count={`${lenEmp}`}
                icon={<FaClipboardUser />}
                color="#0a21bf"
              />
            </Link>
            <Link to={`/admin/${id}/users`}>
              <DashCard
                text="Users"
                count={`${lenAccount}`}
                icon={<FaUsers />}
                color="#e0a80d"
              />
            </Link>
          </div>
          <div className="tables d-flex gap-3">
            <div
              className="table bg-light"
              data-aos="fade-down-right"
              data-aos-duration="1500"
            >
              <div className="text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
                <p className="mt-3">Employee's Department</p>
              </div>
              <div className="tab p-2 bg-white">
                <div
                  className="table-responsive"
                  style={{ maxHeight: "335px", overflowY: "auto" }}
                >
                  <table className="table table-striped table-hover table-bordered text-center shadow p-3 mb-5 bg-body-tertiary">
                    <thead
                      className="table-dark"
                      style={{ position: "sticky", top: 0, zIndex: 1 }}
                    >
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Department</th>
                        <th scope="col">Employees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empByDep.map((val, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{val.departmentDepId}</td>
                            <td>{val.numEmployees}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              className="table bg-light"
              data-aos="fade-up-left"
              data-aos-duration="1500"
            >
              <div className="text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
                <p className="mt-3">Employee's Per Shift</p>
              </div>
              <div className="tab p-2 bg-white">
                <div
                  className="table-responsive"
                  style={{ maxHeight: "335px", overflowY: "auto" }}
                >
                  <table className="table table-striped table-hover table-bordered text-center shadow p-3 mb-5 bg-body-tertiary">
                    <thead
                      className="table-dark"
                      style={{ position: "sticky", top: 0, zIndex: 1 }}
                    >
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Shift</th>
                        <th scope="col">Employees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empByShift.map((val, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>
                              {`Shift ${i + 1}`}
                              <span className="fs-6 text-secondary">
                                {` (${val.shiftStartTime12h} - ${val.shiftEndTime12h})`}
                              </span>
                            </td>
                            <td>{val.numEmployees}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
