import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./AdminLayout.css";

const AdminLayout = ({ user, onLogout, children }) => {
  return (
    <div className="admin-layout">
      <Sidebar username={user?.name} onLogout={onLogout} />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
