import React, { useState, useEffect } from "react";
import Head from "../../Head";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Loading from "../../Loading";
import SmallLoad from "../../SmallLoad";
// import { UGetSharedRowData } from "./User";

const AddUsers = ({ onUpdateSuccess, id1 }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          // `https://attendancesystem-back-end-production.up.railway.app/api/v1/employees/${id}`,
          `https://attendancesystem-back-end-production.up.railway.app/api/v1/employees/${id}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.status === "success") {
          const employee = response.data.data.employee;
          setEmployeeData(employee);
          // إنشاء اسم المستخدم من معرف القسم ومعرف الموظف
          setUserName(`${employee.department.depId}${employee.emId}`);
        }
      } catch (error) {
        toast.error("Error fetching employee data", {
          theme: "colored",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Please enter a password and confirm it", {
        theme: "colored",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password does not match", {
        theme: "colored",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        // "https://attendancesystem-back-end-production.up.railway.app/api/v1/accounts/signup",
        `https://attendancesystem-back-end-production.up.railway.app/api/v1/accounts/signup`,
        {
          userName,
          password,
          passwordConfirm: confirmPassword,
          employee: id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("User created successfully", {
          theme: "colored",
        });
        setLoading(false);
        setTimeout(() => {
          navigate(`/admin/${id1}/users`);
        }, 5000);
        // تحديث البيانات في جميع المسارات
        if (onUpdateSuccess) {
          await onUpdateSuccess();
        }
        // setTimeout(() => {
        //   navigate(`/admin/${id1}/users`);
        // }, 5000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Error creating user", {
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

  if (isLoading) {
    return <Loading />;
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

export default AddUsers;
