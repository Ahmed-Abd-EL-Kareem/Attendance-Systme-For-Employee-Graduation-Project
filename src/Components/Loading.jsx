import React from "react";

const Loading = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center position-absolute"
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
