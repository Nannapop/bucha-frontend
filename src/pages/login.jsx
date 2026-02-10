import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const API_URL = import.meta.env.VITE_API_URL;

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        onLoginSuccess(data.user);
        navigate("/admin-panel");
      } else {
        setError(data.msg || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit">เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
