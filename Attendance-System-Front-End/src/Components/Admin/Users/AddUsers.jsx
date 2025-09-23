import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import Head from "../../ui/Head";
import Loading from "../../ui/Loading";
import SmallLoad from "../../ui/SmallLoad";
import { useEmployee, useCreateAccount } from "../../../hooks/useApiQueries";

const AddUsers = ({ id1 }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Use React Query hooks
  const { data: employeeData, isLoading, error } = useEmployee(id);
  const createAccountMutation = useCreateAccount();

  useEffect(() => {
    if (employeeData) {
      // إنشاء اسم المستخدم من معرف القسم ومعرف الموظف
      setUserName(`${employeeData.department.depId}${employeeData.emId}`);
    }
  }, [employeeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    const accountData = {
      userName,
      password,
      passwordConfirm: confirmPassword,
      employee: id,
    };

    createAccountMutation.mutate(accountData, {
      onSuccess: () => {
        setTimeout(() => {
          navigate(`/admin/${id1}/users`);
        }, 2000);
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading employee data</div>;
  }

  return (
    <>
      <div className="add mt-6 w-100">
        <div className="container ">
          <Head title="User" />
          <div className="back_button mb-2">
            <Link to={`/admin/${id1}/users`}>
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
              <p className="mt-3">User Data</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3>Add New User</h3>
              <form
                onSubmit={handleSubmit}
                className="form mt-4 px-3 d-flex flex-column"
              >
                <label htmlFor="userName">UserName:</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  value={userName}
                  disabled
                  className="form-control"
                />
                <label htmlFor="pass" className="mt-3">
                  Password:
                </label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
                <label htmlFor="confirmPass" className="mt-3">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="confirmPass"
                  id="confirmPass"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                />
                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="button d-flex"
                    type="submit"
                    disabled={createAccountMutation.isPending}
                  >
                    {createAccountMutation.isPending ? (
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

export default AddUsers;
