import React, { useState, useEffect } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Head from "../../ui/Head";
import Loading from "../../ui/Loading";
import SmallLoad from "../../ui/SmallLoad";
import { useUpdateMyPassword } from "../../../hooks/useApiQueries";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const updateMyPassword = useUpdateMyPassword();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Please enter all password fields", {
        theme: "colored",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password does not match confirmation", {
        theme: "colored",
      });
      return;
    }

    setLoading(true);
    try {
      await updateMyPassword.mutateAsync({
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      // toast handled inside hook
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
        <div className="container">
          <Head title="Change Password" />
          <div className="card col-lg-8 col-xl-8 col-xxl-8 bg-light mt-3 ms-1 mb-5">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p className="mt-3">Change Password</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3 data-aos="zoom-in" data-aos-easing="linear">
                Update Your Password
              </h3>
              <form
                onSubmit={handleSubmit}
                className="form mt-4 px-3 d-flex flex-column"
              >
                <label
                  htmlFor="currentPass"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-delay="300"
                >
                  Current Password:
                </label>
                <input
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-delay="300"
                  type="password"
                  name="currentPass"
                  id="currentPass"
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-control"
                />
                <label
                  htmlFor="newPass"
                  className="mt-3"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-delay="500"
                >
                  New Password:
                </label>
                <input
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-delay="500"
                  type="password"
                  name="newPass"
                  id="newPass"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                />
                <label
                  htmlFor="confirmPass"
                  className="mt-3"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-delay="700"
                >
                  Confirm New Password:
                </label>
                <input
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-delay="700"
                  type="password"
                  name="confirmPass"
                  id="confirmPass"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                />
                <div
                  className="d-flex justify-content-end mt-3"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                >
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

export default ChangePassword;
