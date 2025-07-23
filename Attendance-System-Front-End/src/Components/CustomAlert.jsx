import React from "react";
import "react-toastify/dist/ReactToastify.css";

const CustomAlert = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="custom-alert">
      <p>{message}</p>
      <div className="buttons">
        <button className="confirm-button" onClick={onConfirm}>
          Confirm
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
