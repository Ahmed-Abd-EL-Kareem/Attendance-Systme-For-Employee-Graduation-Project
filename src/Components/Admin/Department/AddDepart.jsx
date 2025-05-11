import React, { useState } from "react";
import Head from "../../Head";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import SmallLoad from "../../SmallLoad";

const AddDepart = ({ onUpdateSuccess, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState({
    depId: "",
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedDepartment = {
        ...department,
        depId: department.depId.toUpperCase(),
      };

      const response = await axios.post(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/departments",
        formattedDepartment,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Department Added Successfully", {
          theme: "colored",
        });
        if (onUpdateSuccess) {
          setTimeout(() => {
            navigate(`/admin/${id}/department`);
          }, 5000);
          await onUpdateSuccess();
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Error Adding Department", {
          theme: "colored",
        });
      } else {
        toast.error("Connection error", {
          theme: "colored",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add mt-6 w-100">
        <div className="container">
          <Head title="DEPARTMENT" />
          <div className="back_button mb-2">
            <Link to={`/admin/${id}/department`}>
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
          <div className="card col-lg-8 col-xl-8 col-xxl-8 bg-light mt-3 ms-1">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p className="mt-3">Department Data</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3>Add New Department</h3>
              <form
                onSubmit={handleSubmit}
                className="form mt-4 px-3 d-flex flex-column"
              >
                <label htmlFor="depId">Department ID:</label>
                <input
                  type="text"
                  name="depId"
                  id="depId"
                  value={department.depId}
                  onChange={(e) =>
                    setDepartment({ ...department, depId: e.target.value })
                  }
                  className="form-control"
                  required
                />
                <label htmlFor="name">Department Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={department.name}
                  onChange={(e) =>
                    setDepartment({ ...department, name: e.target.value })
                  }
                  className="form-control"
                  required
                />
                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="button d-flex"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <SmallLoad /> Saving...
                      </>
                    ) : (
                      <>
                        <span className="pe-1 me-1">
                          <BsPlusCircleFill
                            style={{ transform: "translateY(-1px)" }}
                          />
                        </span>
                        Save
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddDepart;
