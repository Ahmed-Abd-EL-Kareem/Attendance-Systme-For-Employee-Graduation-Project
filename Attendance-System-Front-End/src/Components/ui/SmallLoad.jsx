import React from "react";

const SmallLoad = () => {
  return (
    <div className="me-3">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "1.25rem", height: "1.25rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SmallLoad;
