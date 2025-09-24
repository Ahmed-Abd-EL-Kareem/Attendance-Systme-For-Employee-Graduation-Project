import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="mb-4">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-danger">
          <span className="pe-2">
            <MdArrowBackIos />
          </span>
          Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
