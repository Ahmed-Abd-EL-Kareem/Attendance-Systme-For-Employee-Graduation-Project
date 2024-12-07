import React, { useState } from "react";
import Head from "../../Head";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const AddShift = () => {
  const notify = () =>
    toast.success("New Shift Added !!", {
      theme: "colored",
    });
  const [startHours, setStartHours] = useState("");
  const [startMinutes, setStartMinutes] = useState("");
  const [startSeconds, setStartSeconds] = useState("");
  const [endHours, setEndHours] = useState("");
  const [endMinutes, setEndMinutes] = useState("");
  const [endSeconds, setEndSeconds] = useState("");
  return (
    <>
      <div className="add mt-6 w-100">
        <div className="container ">
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
          <div className="card col-lg-8 col-xl-8 col-xxl-8 bg-light mt-3 ms-1">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p className="mt-3">Shift Data</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3>Add New Shift</h3>
              <div className="form mt-4 px-3 d-flex flex-column">
                <label htmlFor="start">Shift Start Time :</label>
                <div className="d-flex flex-wrap justify-content-evenly">
                  <input
                    className="w-25"
                    type="number"
                    name="Hours"
                    id="start"
                    placeholder="Hours"
                    min="0"
                    max="23"
                    value={startHours}
                    onChange={(e) => setStartHours(e.target.value.slice(0, 2))}
                  />
                  <input
                    className="w-25"
                    type="number"
                    name="Minutes"
                    id="start"
                    placeholder="Minutes"
                    min="0"
                    max="59"
                    value={startMinutes}
                    onChange={(e) =>
                      setStartMinutes(e.target.value.slice(0, 2))
                    }
                  />
                  <input
                    className="w-25"
                    type="number"
                    name="Seconds"
                    id="start"
                    placeholder="Seconds"
                    min="0"
                    max="59"
                    value={startSeconds}
                    onChange={(e) =>
                      setStartSeconds(e.target.value.slice(0, 2))
                    }
                  />
                </div>
                <label htmlFor="end">Shift End Time :</label>
                <div className="d-flex flex-wrap justify-content-evenly">
                  <input
                    className="w-25"
                    type="number"
                    name="Hours"
                    id="end"
                    placeholder="Hours"
                    min="0"
                    max="23"
                    value={endHours}
                    onChange={(e) => setEndHours(e.target.value.slice(0, 2))}
                  />
                  <input
                    className="w-25"
                    type="number"
                    name="Minutes"
                    id="end"
                    placeholder="Minutes"
                    min="0"
                    max="59"
                    value={endMinutes}
                    onChange={(e) => setEndMinutes(e.target.value.slice(0, 2))}
                  />
                  <input
                    className="w-25"
                    type="number"
                    name="Seconds"
                    id="end"
                    placeholder="Seconds"
                    min="0"
                    max="59"
                    value={endSeconds}
                    onChange={(e) => setEndSeconds(e.target.value.slice(0, 2))}
                  />
                </div>
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

export default AddShift;
