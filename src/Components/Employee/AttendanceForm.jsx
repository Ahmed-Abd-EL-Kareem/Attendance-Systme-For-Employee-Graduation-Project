import React, { useState } from "react";
import MapBox from "./MapBox";
import Head from "../Head";

const AttendanceForm = () => {
  const [isLocationValid, setIsLocationValid] = useState(false);
  const handleLocationChange = (insidePolygon) => {
    setIsLocationValid(insidePolygon);
  };
  return (
    <>
      <div className="attendance w-100  mt-6">
        <div className="dash container">
          <Head title="Attendance Form" />
          <div className="box ">
            <div
              className="content  w-100 d-flex flex-wrap"
              style={{ height: "85%" }}
            >
              <div className="face col-md-6 col-12 "></div>
              <div className="mapBox col-md-6 col-12 p-4">
                <MapBox onLocationChange={handleLocationChange} />
              </div>
            </div>
            <div
              className="buttons gap-3 d-flex justify-content-center flex-direction-row px-3"
              // style={{ transform: "translateX(50%)" }}
            >
              <button
                type="button"
                className="button out col-md-4 col-lg-2 "
                disabled={!isLocationValid}
              >
                Check Out
              </button>
              <button
                type="button"
                className="button in col-md-4 col-lg-2"
                disabled={!isLocationValid}
              >
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
