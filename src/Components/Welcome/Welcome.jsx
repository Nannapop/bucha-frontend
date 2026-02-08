import React, { useEffect, useState } from "react";
import logo from "../../assets/Buch-logo.png";
import "./Welcome.css";

const Welcome = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="welcome-container">
      <img src={logo} alt="Logo" className="welcome-logo" />
      <p className="welcome-text">ยินดีต้อนรับ</p>
    </div>
  );
};

export default Welcome;
