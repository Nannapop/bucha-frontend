import React from "react";
import "./Confirm.css";

const Confirm = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn-confirm" onClick={onConfirm}>ยืนยัน</button>
          <button className="btn-cancel" onClick={onCancel}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
