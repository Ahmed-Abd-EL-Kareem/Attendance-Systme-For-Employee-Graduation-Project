import React, { useState, useEffect } from "react";
import Head from "../../Head";
import { RiFileHistoryFill } from "react-icons/ri";
import { columns } from "../../Data/ReportColumns";
import Table from "../../Table/Table";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SmallLoad from "../../SmallLoad";

const History = () => {
  const [searchItem, setSearchItem] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(false);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const employeeId = JSON.parse(localStorage.getItem("employeeId"));
      if (!employeeId) {
        toast.error("Employee ID not found", {
          theme: "colored",
        });
        return;
      }

      let url = `https://attendancesystem-back-end-production.up.railway.app/api/v1/reports/${employeeId}`;
      const params = new URLSearchParams();

      if (fromDate) {
        params.append("date[gte]", fromDate);
      }

      if (toDate) {
        params.append("date[lte]", toDate);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url, {
        withCredentials: true,
      });

      if (response.data.status === "success") {
        setReports(response.data.data.reports);
        setFilter(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching reports", {
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
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
                  disabled={loading}
                >
                  {loading ? (
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
      <ToastContainer />
    </>
  );
};

export default History;
