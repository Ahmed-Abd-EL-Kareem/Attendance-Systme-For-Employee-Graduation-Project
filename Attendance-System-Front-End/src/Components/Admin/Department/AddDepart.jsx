import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import Head from "../../ui/Head";
import SmallLoad from "../../ui/SmallLoad";
import { useCreateDepartment } from "../../../hooks/useApiQueries";

const AddDepart = () => {
  const navigate = useNavigate();
  const { adminId: id } = useParams();
  const [department, setDepartment] = useState({
    depId: "",
    name: "",
  });

  // Use React Query mutation
  const createDepartmentMutation = useCreateDepartment();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDepartment = {
      ...department,
      depId: department.depId.toUpperCase(),
    };

    createDepartmentMutation.mutate(formattedDepartment, {
      onSuccess: () => {
        setTimeout(() => {
          navigate(`/admin/${id}/department`);
        }, 2000);
      },
    });
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
                    disabled={createDepartmentMutation.isPending}
                  >
                    {createDepartmentMutation.isPending ? (
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
    </>
  );
};

export default AddDepart;
