import React, { useState } from "react";
import Head from "../../Head";
import Table from "../../Table/Table";
import { columns } from "../../Data/UserColumns";
import Data from "../../Data/UsersData.json";
let sharedRowData = null; // Placeholder for the clicked row's data
const setSharedRowData = (data) => {
  sharedRowData = data;
};
export const SGetSharedRowData = () => sharedRowData;
const User = () => {
  const handleEdit = (rowData) => {
    setSharedRowData(rowData);
    console.log("Edit clicked for row:", SGetSharedRowData());
  };

  const data = Data.data.map((item) => ({
    ...item,
    onEdit: handleEdit, // Attach the onEdit function to each row
  }));
  const [searchItem, setSearchItem] = useState("");

  return (
    <>
      <div className="user ms-1 mt-6 w-100">
        <div className="container">
          <Head title="User" />
          <div className="table bg-light ">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p className="mt-3">DataTable Users</p>
              <div class="d-flex align-items-center form">
                <input
                  class="form-control "
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
