import React, { useState, useEffect } from "react";
import Head from "../../ui/Head";
import Table from "../../Table/Table";
import { columns } from "../../Data/UserColumns";

import { Link, useNavigate } from "react-router-dom";
import { useEmployees } from "../../../hooks/useApiQueries";
import { FaCirclePlus } from "react-icons/fa6";

const User = () => {
  const [data, setData] = useState([]);
  const { data: employees = [] } = useEmployees();
  // const navigate = useNavigate();

  useEffect(() => {
    setData(employees);
  }, [employees]);

  // const handleEdit = (rowData) => {
  //   console.log("Account ID:", rowData.id);
  //   navigate(`/admin/users/edit/${rowData.id}`);
  // };

  // const enhancedData = data.map((item) => ({
  //   ...item,
  //   onEdit: handleEdit,
  // }));

  const [searchItem, setSearchItem] = useState("");

  return (
    <>
      <div className="user ms-1 mt-6 w-100">
        <div className="container">
          <Head title="User" />
          <div className="table bg-light ">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p
                className="mt-3"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                DataTable Users
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

export default User;
