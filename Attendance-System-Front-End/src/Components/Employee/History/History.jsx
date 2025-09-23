import React, { useState } from "react";
import { RiFileHistoryFill } from "react-icons/ri";
import { columns } from "../../Data/ReportColumns";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../Table/Table";
import SmallLoad from "../../ui/SmallLoad";
import Head from "../../ui/Head";
import { useEmployeeReports } from "../../../hooks/useApiQueries";

const History = () => {
  const [searchItem, setSearchItem] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filter, setFilter] = useState(false);

  // Get employee ID from localStorage
  const employeeId = JSON.parse(localStorage.getItem("employeeId"));

  // Build query parameters
  const queryParams = {};
  if (fromDate) queryParams["date[gte]"] = fromDate;
  if (toDate) queryParams["date[lte]"] = toDate;

  // Use React Query hook
  const {
    data: reports = [],
    isLoading,
    error,
    refetch,
  } = useEmployeeReports(employeeId, queryParams);

  const fetchReports = () => {
    setFilter(true);
    refetch();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="history mt-6 w-100">
        <div className="container">
          <Head title="Attendance History" />
          <div className="card bg-light p-4">
            <fieldset
              className="border p-3"
              data-aos="zoom-out"
              data-aos-duration="1500"
            >
              <legend>Filter Report</legend>
              <div className="form d-flex flex-wrap justify-content-around align-items-center">
                <div className="mt-3">
                  <label htmlFor="from" className="me-2">
                    From:
                  </label>
                  <input
                    type="date"
                    name="from"
                    id="from"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="to" className="me-2">
                    To:
                  </label>
                  <input
                    type="date"
                    name="to"
                    id="to"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <button
                  className="btn-rep mt-3 d-flex align-items-center"
                  onClick={fetchReports}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <SmallLoad />
                      Show Attendance
                    </>
                  ) : (
                    <>
                      <RiFileHistoryFill className="border-end fs-6 ms-1 me-2" />
                      Show Attendance
                    </>
                  )}
                </button>
              </div>
            </fieldset>
          </div>
          {filter && (
            <div className="table bg-light my-5">
              <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
                <p className="mt-3">DataTable Employee</p>
                <button className="buttonDownload" onClick={handlePrint}>
                  Print Report
                </button>
              </div>
              <div className="p-2 bg-white">
                <div className="d-flex align-items-center justify-content-end mt-2 mb-3 form">
                  <input
                    className="form-control w-auto"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ marginLeft: "-33px" }}
                  ></i>
                </div>
                <div className="printableTable tab">
                  <Table columns={columns} data={reports} search={searchItem} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
