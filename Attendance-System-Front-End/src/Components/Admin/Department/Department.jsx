import React, { useState, useEffect } from "react";
// import Data from "../../Data/DepartData.json";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { columns } from "../../Data/DepartTable";
import Table from "../../Table/Table";
import Head from "../../ui/Head";
import Loading from "../../ui/Loading";
// let sharedRowData = null; // Placeholder for the clicked row's data
// const setSharedRowData = (data) => {
//   sharedRowData = data;
// };
// export const DGetSharedRowData = () => sharedRowData;
const Department = ({ departments, id }) => {
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    if (departments) {
      setLoading(false);
    }
  }, [departments]);

  if (loading) {
    return <Loading />;
  }

  // const handleEdit = (rowData) => {
  //   setSharedRowData(rowData);
  //   // console.log("Edit clicked for row:", rowData);
  //   console.log("Edit clicked for row:", DGetSharedRowData());
  //   // exports.rowData = rowData;
  //   // You can now use rowData for editing (e.g., open a modal or navigate to an edit page)
  // };

  // const data = Data.data.map((item) => ({
  //   ...item,
  //   onEdit: handleEdit, // Attach the onEdit function to each row
  // }));

  return (
    <>
      <div className="department ms-1 mt-6 w-100">
        <div className="container">
          <Head title="Department" />
          <div className="add_button mb-2">
            <button
              data-aos="fade-right"
              data-aos-duration="1500"
              className="pushable"
              title="Disabled to protect database"
              disabled
              style={{ cursor: "not-allowed", opacity: 0.6 }}
            >
              <span className="shadow" />
              <span className="edge" />
              <span className="front">
                <span className="pe-2 me-2 border-end">
                  <FaCirclePlus />
                </span>
                Add Department
              </span>
            </button>
          </div>
          <div className="table bg-light">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p
                data-aos="fade-right"
                data-aos-duration="1500"
                className="mt-3"
              >
                DataTable Department
              </p>
              <div
                data-aos="fade-left"
                data-aos-duration="1500"
                className="d-flex align-items-center form"
              >
                <input
                  className="form-control"
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
            </div>
            <div className="tab p-2 bg-white">
              <Table columns={columns} data={departments} search={searchItem} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Department;
