import React from "react";
import Head from "../../Head";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const DepartInfo = () => {
  const notify = () =>
    toast.success("New Department Added !!", {
      theme: "colored",
    });
  return (
    <>
      <div className="add mt-6 w-100">
        <div className="container ">
          <Head title="DEPARTMENT" />
          <div className="back_button mb-2">
            <Link to="/department">
              <button className="pushable">
                <span className="shadow" />
                <span className="edge" />
                <span className="front">
                  <span className="pe-2 me-2 border-end">
                    <MdArrowBackIos />
                  </span>
                  Back
                </span>
              </button>
            </Link>
          </div>
          <div className="card  col-lg-8 col-xl-8 col-xxl-8 bg-light mt-3 ms-1">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p className="mt-3">Department Data</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3>Add New Department</h3>
              <div className="form mt-4 px-3 d-flex flex-column">
                <label htmlFor="id">Department ID :</label>
                <input type="text" name="id" id="id" />
                <label htmlFor="name">Department Name :</label>
                <input type="text" name="name" id="name" />
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button class="button" onClick={notify}>
                  <span className="pe-1 me-1 ">
                    <BsPlusCircleFill
                      style={{ transform: "translateY(-1px)" }}
                    />
                  </span>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DepartInfo;
