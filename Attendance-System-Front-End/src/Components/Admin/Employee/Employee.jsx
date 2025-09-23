import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { columns } from "../../Data/EmpColumns";
import Table from "../../Table/Table";
import Head from "../../ui/Head";

const Employee = ({ employees, id }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setData(employees);
    // const fetchDoctor = async () => {
    //   const { data } = await axios.get(
    //     "http://127.0.0.1:8000/api/v1/employees",
    //     { withCredentials: true }
    //   );
    //   setData(data?.data.employees);
    // };
    // fetchDoctor();
  }, [employees]);

  // const handleEdit = (rowData) => {
  //   console.log("Employee ID:", rowData.id);
  //   navigate(`/admin/employee/edit/${rowData.id}`);
  // };

  // const enhancedData = data.map((item) => ({
  //   ...item,
  //   onEdit: handleEdit,
  // }));

  const [searchItem, setSearchItem] = useState("");
  return (
    <>
      <div className="employee ms-1 mt-6 w-100">
        <div className="container">
          <Head title="Employee" />
          <div className="add_button mb-2">
            <Link to={`/admin/${id}/employee/add`}>
              <button
                className="pushable"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                <span className="shadow" />
                <span className="edge" />
                <span className="front">
                  <span className="pe-2 me-2 border-end">
                    <FaCirclePlus />
                  </span>
                  Add Employee
                </span>
              </button>
            </Link>
          </div>
          <div className="table bg-light ">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p
                className="mt-3"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                DataTable Employee
              </p>
              <div
                className="d-flex align-items-center form"
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                <input
                  className="form-control "
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
              <Table columns={columns} data={data} search={searchItem} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
