import React from "react";
import MapBox from "./MapBox";

const AttendanceForm = () => {
  return (
    <>
      <div className="dash container" style={{ marginTop: "70px" }}>
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
            <button type="button" className="btn btn-success">
              Check IN
            </button>
            <button type="button" className="btn btn-danger">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceForm;
