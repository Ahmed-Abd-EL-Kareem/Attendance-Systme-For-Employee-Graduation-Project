import React, { useState } from "react";
import Head from "../../Head";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import SmallLoad from "../../SmallLoad";

const AddShift = ({ onUpdateSuccess, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shift, setShift] = useState({
    startTime: "",
    endTime: "",
  });

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedShift = {
        startTime: formatTime(shift.startTime),
        endTime: formatTime(shift.endTime),
      };

      const response = await axios.post(
        "https://90-attendance-system-back-end.vercel.app/api/v1/shifts",
        formattedShift,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Shift added successfully", {
          theme: "colored",
        });
        setLoading(false);
        if (onUpdateSuccess) {
          setTimeout(() => {
            navigate(`/admin/${id}/shift`);
          }, 5000);
          await onUpdateSuccess();
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Error adding shift", {
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
      <div className="add ms-1 mt-6 w-100">
        <div className="container">
          <Head title="SHIFT" />
          <div className="back_button mb-2">
            <Link to={`/admin/${id}/shift`}>
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
              <p className="mt-3">Shift Data</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3>Add New Shift</h3>
              <form
                onSubmit={handleSubmit}
                className="form mt-4 px-3 d-flex flex-column"
              >
                <label htmlFor="start">Shift Start Time:</label>
                <input
                  type="time"
                  name="start"
                  id="start"
                  value={shift.startTime}
                  onChange={(e) =>
                    setShift({ ...shift, startTime: e.target.value })
                  }
                  className="form-control"
                  required
                />
                <label htmlFor="end">Shift End Time:</label>
                <input
                  type="time"
                  name="end"
                  id="end"
                  value={shift.endTime}
                  onChange={(e) =>
                    setShift({ ...shift, endTime: e.target.value })
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

export default AddShift;
