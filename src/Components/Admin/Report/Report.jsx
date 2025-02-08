import React, { useState } from "react";
import Head from "../../Head";
import DData from "../../Data/DepartData.json";
import { HiDocumentReport } from "react-icons/hi";
import Table from "../../Table/Table";
import { columns } from "../../Data/ReportColumns";
import data from "../../Data/ReportData.json";
const Report = () => {
  const [searchItem, setSearchItem] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState(data.reports);
  const [filter, setFilter] = useState(false);

  const handleFilter = () => {
    const filtered = data.reports.filter((report) => {
      const reportDate = new Date(report.date);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return reportDate >= from && reportDate <= to;
    });
    setFilteredData(filtered);
    setFilter(true);
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="report mt-6 w-100">
        <div className="container">
          <Head title="Report" />
          <div className="card bg-light p-4">
            <fieldset
              className="border p-3"
              data-aos="zoom-out"
              data-aos-duration="1500"
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
                  <label htmlFor="dName" className="me-2">
                    Department Name :
                  </label>
                  <select name="dName" id="dName">
                    {DData.data.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn-rep mt-3" onClick={handleFilter}>
                  <HiDocumentReport className="border-end fs-5 mx-1" />
                  Show Report
                </button>
              </div>
            </fieldset>
          </div>
          {filter && (
            <div className="table bg-light my-5 ">
              <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
                <p className="mt-3">DataTable Employee</p>
                <button class="buttonDownload" onClick={handlePrint}>
                  Print Report
                </button>
              </div>
              <div className="p-2 bg-white">
                <div class="d-flex align-items-center justify-content-end mt-2 mb-3 form">
                  <input
                    class="form-control w-auto"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                  <i
                    class="fa-solid fa-magnifying-glass"
                    style={{ marginLeft: "-33px" }}
                  ></i>
                </div>
                <div className="printableTable tab">
                  <Table
                    columns={columns}
                    data={filteredData}
                    search={searchItem}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Report;
