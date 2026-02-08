import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import ConfirmDialog from "../Confirm/Confirm";

const Sidebar = ({ username, onLogout }) => {
  const navigate = useNavigate();

  // state สำหรับ confirm logout
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(""); // เก็บข้อความที่จะโชว์

  // กดปุ่ม Logout เด้ง popup พร้อมข้อความ
  const handleLogoutClick = () => {
    setConfirmMessage("คุณต้องการออกจากระบบหรือไม่?");
    setShowConfirm(true);
  };

  // ทำงาน logout จริง
  const doLogout = () => {
    setShowConfirm(false);
    if (onLogout) onLogout(); // ถ้ามีฟังก์ชัน logout ที่ส่งมา
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin-Panel</h2>

      {/* username */}
      <div className="user-info">
        <p>Username: {username}</p>
      </div>

      {/* Edit Website */}
      <div className="sidebar-section">
        <ul>
          <li><Link to="/Admin-panel">หน้าหลัก</Link></li>
        </ul>
        <p className="section-title">แก้ไขเว็บไซต์</p>
        <ul>
          <li><Link to="/Admin-panel/Edit-about-txt">เกี่ยวกับบริษัท</Link></li>
          <li><Link to="/Admin-panel/Edit-company">บริษัทที่ร่วมงาน</Link></li>
          <li><Link to="/Admin-panel/Edit-testimonials">รีวิว</Link></li>
          <li><Link to="/Admin-panel/Edit-Services">บริการ</Link></li>
          <li><Link to="/Admin-panel/Edit-Gallery">แกลอรี่</Link></li>
        </ul>
      </div>

      {/* Task Manager */}
      <div className="sidebar-section">
        <p className="section-title">จัดการงาน</p>
        <ul>
          <li><Link to="/Admin-panel/Summary">สรุปผล</Link></li>
          <li><Link to="/Admin-panel/tasks">งาน</Link></li>
        </ul>
      </div>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogoutClick}>
        ออกจากระบบ
      </button>

      {/* popup ยืนยัน เด้งๆ */}
      <ConfirmDialog
        show={showConfirm}
        message={confirmMessage}
        onConfirm={doLogout}
        onCancel={() => setShowConfirm(false)}
      />
    </aside>
  );
};

export default Sidebar;
