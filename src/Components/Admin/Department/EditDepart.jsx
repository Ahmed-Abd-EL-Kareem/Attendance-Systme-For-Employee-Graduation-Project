import React, { useState, useEffect } from "react";
import Head from "../../Head";
import { Link, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Loading from "../../Loading";
import "react-toastify/dist/ReactToastify.css";
// import Department from "./Department";
import SmallLoad from "../../SmallLoad";

const EditDepart = ({ onUpdateSuccess, id1 }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [department, setDepartment] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          `https://attendancesystem-back-end-production.up.railway.app/api/v1/departments/${id}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.status === "success") {
          const Department = response.data.data.department;
          setDepartment(Department);
          setName(Department.name);
        }
      } catch (error) {
        toast.error("Error fetching department data", {
          theme: "colored",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        `https://attendancesystem-back-end-production.up.railway.app/api/v1/departments/${id}`,
        { name },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Department updated successfully", {
          theme: "colored",
        });
        if (onUpdateSuccess) {
          await onUpdateSuccess();
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Error updating department",
          {
            theme: "colored",
          }
        );
      } else {
        toast.error("Connection error", {
          theme: "colored",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="add ms-1 mt-6 w-100">
        <div className="container">
          <Head title="DEPARTMENT" />
          <div className="back_button mb-2">
            <Link to={`/admin/${id1}/department`}>
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
          <div className="card col-lg-8 col-xl-8 col-xxl-8 bg-light mt-3">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p className="mt-3">Department Data</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3>Edit Department Data</h3>
              <form
                onSubmit={handleSubmit}
                className="form mt-4 px-3 d-flex flex-column"
              >
                <label htmlFor="id">Department ID :</label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={department.depId}
                  disabled
                  className="form-control"
                />
                <label htmlFor="name">Department Name :</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
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
                        Save Changes
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

export default EditDepart;
