import React, { useState } from "react";
import Head from "../../Head";
// import DData from "../../Data/DepartData.json";
import { HiDocumentReport } from "react-icons/hi";
import Table from "../../Table/Table";
import { columns } from "../../Data/ReportColumns";
import axios from "axios";
import Loading from "../../Loading";
import SmallLoad from "./../../SmallLoad";

const Report = ({ reportData, departments }) => {
  const [isByDepartment, setIsByDepartment] = useState(false); // Default to "By Department"

  const handleToggle = (event) => {
    console.log(event.target.checked);
    setIsByDepartment(event.target.checked);
    console.log(
      "Filter:",
      event.target.checked ? "By Employee" : "By Department"
    );
    // Example: Trigger API call based on filter
    // fetchData(event.target.checked ? "department" : "employee");
  };
  const [reports, setReports] = useState(reportData);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  // const [filteredData, setFilteredData] = useState(data.reports);
  const [filter, setFilter] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const fetchReports = async () => {
    try {
      setLoading(true);
      // let url = "http://127.0.0.1:8000/api/v1/reports";
      let url =
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/reports";

      const params = new URLSearchParams();

      if (isByDepartment) {
        setDepartment("");
      } else {
        setEmployeeId("");
      }
      if (department) {
        const departmentId = departments.find((d) => d.name === department)._id;
        params.append("departmentId", departmentId);
      }

      if (fromDate) {
        params.append("date[gte]", fromDate);
      }

      if (toDate) {
        params.append("date[lte]", toDate);
      }

      if (employeeId) {
        params.append("emId", employeeId);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url, {
        withCredentials: true,
      });

      if (response.data.status === "success") {
        setReports(response.data.data.reports);
      }
      setFilter(true);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePrint = () => {
    window.print();
  };

  // useEffect(() => {
  //   fetchReports();
  // }, []);

  // const handleDepartmentChange = (e) => {
  //   setSelectedDepartment(e.target.value);
  // };

  // const handleFromDateChange = (e) => {
  //   setFromDate(e.target.value);
  // };

  // const handleToDateChange = (e) => {
  //   setToDate(e.target.value);
  // };

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    // <div className="report ms-1 mt-6 w-100">
    //   <div className="container">
    //     <Head title="Reports" />
    //     <div className="filters mb-3">
    //       <div className="row">
    //         <div className="col-md-4">
    //           <select
    //             className="form-select"
    //             value={selectedDepartment}
    //             onChange={handleDepartmentChange}
    //           >
    //             <option value="">All Departments</option>
    //             {departments.map((department) => (
    //               <option key={department.id} value={department.id}>
    //                 {department.name}
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    //         <div className="col-md-4">
    //           <input
    //             type="date"
    //             className="form-control"
    //             value={fromDate}
    //             onChange={handleFromDateChange}
    //             placeholder="From Date"
    //           />
    //         </div>
    //         <div className="col-md-4">
    //           <input
    //             type="date"
    //             className="form-control"
    //             value={toDate}
    //             onChange={handleToDateChange}
    //             placeholder="To Date"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="table bg-light">
    //       <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
    //         <p className="mt-3">Reports Data</p>
    //       </div>
    //       <div className="tab p-2 bg-white">
    //         <Table columns={columns} data={reports} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="report mt-6 w-100">
        <div className="container">
          <Head title="Report" />
          <div className="card bg-light p-4 d-flex align-items-center overflow-hidden">
            <label
              htmlFor="filter"
              className="switch"
              aria-label="Toggle Filter"
            >
              <input
                type="checkbox"
                id="filter"
                checked={isByDepartment}
                onChange={handleToggle}
              />
              <span>By Department</span>
              <span>By Employee</span>
            </label>
            <fieldset
              className="border p-3 w-100"
              data-aos="zoom-out"
              data-aos-duration="1500"
              style={{
                transform: isByDepartment
                  ? "translateX(-110%)"
                  : "translateX(0%)",
                // position: isByDepartment ? "absolute" : "relative",
                // display: isByDepartment ? "none" : "block",
              }}
            >
              <legend>Filter Report</legend>
              <div className="form d-flex flex-wrap justify-content-around align-items-center ">
                <div className="mt-3">
                  <label htmlFor="from" className="me-2">
                    From:
                  </label>
                  <input
                    type="date"
                    name="from"
                    id="from"
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="from" className="me-2">
                    To:
                  </label>
                  <input
                    type="date"
                    name="to"
                    id="to"
                    value={toDate}
                    onChange={(e) => {
                      setToDate(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="department" className="me-2" key="department">
                    Department Name :
                  </label>
                  <select
                    name="department"
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">Select Department</option>
                    {departments.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn-rep mt-3 d-flex" onClick={fetchReports}>
                  {loading ? (
                    <SmallLoad />
                  ) : (
                    <HiDocumentReport className="border-end fs-5 ms-1 me-3" />
                  )}
                  Show Report
                </button>
              </div>
            </fieldset>
            <fieldset
              className="border p-3"
              data-aos="zoom-out"
              data-aos-duration="1500"
              style={{
                transform: isByDepartment
                  ? "translateX(0%)"
                  : "translateX(110%)",
                position: "absolute",
                top: "84px",
                width: "calc(100% - 3rem)",
              }}
            >
              <legend>Filter Report</legend>
              <div className="form d-flex flex-wrap justify-content-around align-items-center ">
                <div className="mt-3">
                  <label htmlFor="from" className="me-2">
                    From:
                  </label>
                  <input
                    type="date"
                    name="from"
                    id="from"
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="from" className="me-2">
                    To:
                  </label>
                  <input
                    type="date"
                    name="to"
                    id="to"
                    value={toDate}
                    onChange={(e) => {
                      setToDate(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="department" className="me-2">
                    Employee ID :
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    id="employeeId"
                    placeholder="Enter Employee ID"
                    value={employeeId}
                    onChange={(e) => {
                      setEmployeeId(e.target.value);
                    }}
                  />
                </div>
                <button className="btn-rep mt-3 d-flex" onClick={fetchReports}>
                  {loading ? (
                    <SmallLoad />
                  ) : (
                    <HiDocumentReport className="border-end fs-5 ms-1 me-3" />
                  )}
                  Show Report
                </button>
              </div>
            </fieldset>
          </div>
          {filter ? (
            <div className="table bg-light my-5 ">
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
          ) : (
            loading && <Loading />
            // <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export default Report;
