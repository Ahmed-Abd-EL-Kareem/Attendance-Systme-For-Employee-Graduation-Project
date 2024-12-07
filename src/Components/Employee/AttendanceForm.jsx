import React from "react";
import MapBox from "./MapBox";
import Head from "../Head";

const AttendanceForm = () => {
  return (
    <>
      <div className="attendance w-100  mt-6">
        <div className="dash container">
          <Head title="Attendance Form" />
          <div className="box ">
            <div className="content w-100 d-flex" style={{ height: "85%" }}>
              <div className="face w-50 h-100"></div>
              <div className="mapBox w-50 h-100 p-4">
                <MapBox />
              </div>
            </div>
            <div
              className="buttons d-flex w-50 justify-content-evenly flex-direction-row"
              style={{ transform: "translateX(50%)" }}
            >
              <button type="button" className="button out">
                Check Out
              </button>
              <button type="button" className="button in">
                Check IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceForm;
