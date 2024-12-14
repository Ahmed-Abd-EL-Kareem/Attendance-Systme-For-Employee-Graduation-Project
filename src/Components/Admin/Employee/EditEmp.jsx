import React, { useState } from "react";
import Head from "../../Head";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import DData from "../../Data/DepartData.json";
import SData from "../../Data/ShiftData.json";
import { EGetSharedRowData } from "./Employee";

const EditEmp = () => {
  const notify = () =>
    toast.success("Employee Edited Successfully!!", {
      theme: "colored",
    });
  const parseDate = (formattedDate) => {
    const date = new Date(formattedDate); // Parse the formatted date string
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  };
  const convertTo24HourFormat = (timeRange) => {
    const convert = (time) => {
      const [hourMinute, period] = time.split(" ");
      let [hour, minute] = hourMinute.split(":").map(Number);
      if (period.toLowerCase() === "pm" && hour !== 12) hour += 12;
      if (period.toLowerCase() === "am" && hour === 12) hour = 0;
      return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}:00`;
    };

    const [start, end] = timeRange.split(" - ");
    return `${convert(start)} - ${convert(end)}`;
  };

  const [empId, setEmpId] = useState(EGetSharedRowData().id);
  const [empName, setEmpName] = useState(EGetSharedRowData().name);
  const [img, setImg] = useState(EGetSharedRowData().img);
  const [gender, setGender] = useState(EGetSharedRowData().gender);
  const [shift, setShift] = useState(
    convertTo24HourFormat(EGetSharedRowData().shift)
  );
  const [dof, setDof] = useState(parseDate(EGetSharedRowData().dof));
  const [date, setDate] = useState(parseDate(EGetSharedRowData().date));

  return (
    <>
      <div className="add mt-6 w-100">
        <div className="container ">
          <Head title="Employee" />

          <div className="back_button mb-2">
            <Link to="/employee">
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

          <div className="card  col-lg-10 col-xl-9 col-xxl-8 bg-light mt-3 ms-1 mb-3">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p className="mt-3">Employee Data</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3>Edit Employee</h3>
              <div className="form mt-4 px-3 row">
                <div className="img d-flex flex-column align-items-center justify-content-center mb-4">
                  <img
                    src={`../../${img}`}
                    alt=""
                    className="w-25 rounded-circle mb-4"
                  />
                  <div className="d-flex justify-content-between w-100">
                    <label htmlFor="image">Change Employee Image:</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="buttonDownload"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className=" row">
                  <div className="col-md-6 d-flex flex-column">
                    {/* <div className="row"> */}
                    <label htmlFor="eId" className="">
                      Employee ID :
                    </label>
                    <input
                      className=" me-4"
                      type="text"
                      name="eId"
                      id="eId"
                      value={empId}
                      disabled
                    />
                    <label htmlFor="dob" className=" w-auto">
                      Employee D.O.B :
                    </label>
                    <input
                      className=" w-auto"
                      type="date"
                      name="dob"
                      id="dob"
                      value={dof}
                      onChange={(e) => setDof(e.target.value)}
                    />
                    <label htmlFor="shift" className=" w-auto">
                      Shift :
                    </label>
                    <select
                      className=""
                      name="shift"
                      id="shift"
                      value={shift} // This determines the selected option
                      onChange={(e) => setShift(e.target.value)} // Update the state when an option is selected
                    >
                      {SData.data.map((item) => (
                        <option
                          key={item.id}
                          value={`${item.start} - ${item.end}`} // Use value to match the state
                        >
                          {`${item.start} - ${item.end}`}{" "}
                          {/* Display the option text */}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className=" col-md-6 d-flex flex-column">
                    <label htmlFor="eName" className=" ">
                      Employee Name :
                    </label>
                    <input
                      className=""
                      name="eName"
                      id="eName"
                      value={empName}
                      onChange={(e) => setEmpName(e.target.value)}
                    />
                    <label htmlFor="hire" className=" w-auto">
                      Hire Date :
                    </label>
                    <input
                      className=" w-auto"
                      type="date"
                      name="hire"
                      id="hire"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <label htmlFor="department" className=" w-auto">
                      Department :
                    </label>
                    <select name="department" id="department" className=" ">
                      {DData.data.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-flex align-items-baseline justify-content-center mt-2">
                  <label htmlFor="gender" className=" w-auto">
                    Gender :
                  </label>
                  <div
                    className="gender d-flex justify-content-evenly align-items-baseline col-md-4 w-75"
                    id="gender"
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={() => setGender("Male")}
                    />
                    <label htmlFor="male" className="fs-6">
                      Male
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={() => setGender("Female")}
                    />
                    <label htmlFor="female" className="fs-6">
                      Female
                    </label>
                  </div>
                  {/* </div> */}
                </div>
                {/* <div className="row"> */}
                {/* </div> */}
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button className="button" onClick={notify}>
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

export default EditEmp;
