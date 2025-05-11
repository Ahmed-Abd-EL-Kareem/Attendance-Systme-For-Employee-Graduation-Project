import React from "react";

export default function DeleteModal({ isOpen, message, onConfirm, onCancel }) {
  return (
    <div className={`delete-modal ${isOpen ? "open" : ""}`}>
      <div className="delete-modal-content">
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
    </div>
  );
}
