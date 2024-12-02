import React, { useState } from "react";
import Head from "../../Head";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { getSharedRowData } from "./Shift";
import "react-toastify/dist/ReactToastify.css";
const EditShift = () => {
  const notify = () =>
    toast.success("New Department Added !!", {
      theme: "colored",
    });
  const start = getSharedRowData().start.split(":");
  const end = getSharedRowData().end.split(":");
  const [startHours, setStartHours] = useState(start[0]);
  const [startMinutes, setStartMinutes] = useState(start[1]);
  const [startSeconds, setStartSeconds] = useState(start[2]);
  const [endHours, setEndHours] = useState(end[0]);
  const [endMinutes, setEndMinutes] = useState(end[1]);
  const [endSeconds, setEndSeconds] = useState(end[2]);

  return (
    <>
      <div className="add ms-1 mt-6 w-100">
        <div className="container">
          <Head title="SHIFT" />
          <div className="back_button mb-2">
            <Link to="/shift">
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
              <h3>Edit Shift Data</h3>
              <div className="form mt-4 px-3 d-flex flex-column">
                <label htmlFor="start">Shift Start Time :</label>
                <div className="d-flex flex-wrap justify-content-evenly">
                  <input
                    value={startHours}
                    className="w-25"
                    type="number"
                    name="Hours"
                    id="start"
                    placeholder="Hours"
                    min="0"
                    max="23"
                    onChange={(e) => setStartHours(e.target.value.slice(0, 2))}
                  />
                  <input
                    value={startMinutes}
                    className="w-25"
                    type="number"
                    name="Minutes"
                    id="start"
                    placeholder="Minutes"
                    min="0"
                    max="59"
                    onChange={(e) =>
                      setStartMinutes(e.target.value.slice(0, 2))
                    }
                  />
                  <input
                    value={startSeconds}
                    className="w-25"
                    type="number"
                    name="Seconds"
                    id="start"
                    placeholder="Seconds"
                    min="0"
                    max="59"
                    onChange={(e) =>
                      setStartSeconds(e.target.value.slice(0, 2))
                    }
                  />
                </div>
                <label htmlFor="name">Shift End Time :</label>
                <div className="d-flex flex-wrap justify-content-evenly">
                  <input
                    value={endHours}
                    className="w-25"
                    type="number"
                    name="Hours"
                    id="end"
                    placeholder="Hours"
                    min="0"
                    max="23"
                    onChange={(e) => setEndHours(e.target.value.slice(0, 2))}
                  />
                  <input
                    value={endMinutes}
                    className="w-25"
                    type="number"
                    name="Minutes"
                    id="end"
                    placeholder="Minutes"
                    min="0"
                    max="59"
                    onChange={(e) => setEndMinutes(e.target.value.slice(0, 2))}
                  />
                  <input
                    value={endSeconds}
                    className="w-25"
                    type="number"
                    name="Seconds"
                    id="end"
                    placeholder="Seconds"
                    min="0"
                    max="59"
                    onChange={(e) => setEndSeconds(e.target.value.slice(0, 2))}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  class="button"
                  onClick={() => {
                    return (
                      console.log(
                        startHours,
                        startMinutes,
                        startSeconds,
                        endHours,
                        endMinutes,
                        endSeconds
                      ),
                      notify
                    );
                  }}
                >
                  <span className="pe-1 me-1 ">
                    <BsPlusCircleFill
                      style={{ transform: "translateY(-1px)" }}
                    />
                  </span>
                  Save Changes
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

export default EditShift;
