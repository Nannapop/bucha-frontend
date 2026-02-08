import React from "react";
import { Navigate } from "react-router-dom";

const Routeprotect = ({ user, requiredPerm, children }) => {
  // ถ้าไม่ได้ login กลับหน้า home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ถ้า perm ของ user ไม่ตรง กลับหน้า home
  if (requiredPerm && user.perm !== requiredPerm) {
    return <Navigate to="/" replace />;
  }

  // ผ่านการตรวจสอบ render children
  return children;
};

export default Routeprotect;
