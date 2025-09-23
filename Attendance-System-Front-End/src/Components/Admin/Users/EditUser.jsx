import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import Head from "../../ui/Head";
import Loading from "../../ui/Loading";
import SmallLoad from "../../ui/SmallLoad";
// import { UGetSharedRowData } from "./User";

const EditUsers = ({ id1 }) => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://90-attendance-system-back-end.vercel.app/api/v1/accounts/${id}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.status === "success") {
          setUserName(response.data.data.account.userName);
        }
      } catch (error) {
        toast.error("Error fetching user data", {
          theme: "colored",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
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
      const response = await axios.patch(
        `https://90-attendance-system-back-end.vercel.app/api/v1/accounts/updateEmployeePassword/${id}`,
        { password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Password updated successfully", {
          theme: "colored",
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Error updating password", {
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
              <h3>Edit Password</h3>
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
                  Password :
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
    </>
  );
};

export default EditUsers;
