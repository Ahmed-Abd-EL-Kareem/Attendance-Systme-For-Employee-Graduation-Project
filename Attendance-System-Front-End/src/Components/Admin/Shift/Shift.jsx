import React, { useState, useEffect } from "react";
import { columns } from "../../Data/ShiftColumns";
import Table from "../../Table/Table";
import Head from "../../Head";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import Loading from "../../Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shift = ({ shifts, id }) => {
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    if (shifts) {
      setLoading(false);
    }
  }, [shifts]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="shift ms-1 mt-6 w-100">
        <div className="container">
          <Head title="Shift" />
          <div className="add_button mb-2">
            <Link to={`/admin/${id}/shift/add`}>
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
                  Add Shift
                </span>
              </button>
            </Link>
          </div>
          <div className="table bg-light">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p
                className="mt-3"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                DataTable Shift
              </p>
              <div
                className="d-flex align-items-center form"
                data-aos="fade-left"
                data-aos-duration="1500"
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
              <Table columns={columns} data={shifts} search={searchItem} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Shift;
