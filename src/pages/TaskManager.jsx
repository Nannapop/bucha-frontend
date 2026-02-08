import React, { useState, useEffect } from "react";
import "./TaskManager.css";

const API_URL = import.meta.env.VITE_API_URL;

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", company: "" });
  const [completeDates, setCompleteDates] = useState({}); // แยก date ต่อ task

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setForm({ name: "", date: "", company: "" });
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markComplete = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}/complete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date_complete: completeDates[id] }),
      });
      setCompleteDates((prev) => ({ ...prev, [id]: "" }));
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="task-container">
      <h2>จัดการงาน</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="name"
          placeholder="ชื่องาน"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="บริษัท"
          value={form.company}
          onChange={handleChange}
          required
        />
        <button type="submit">เพิ่มงาน</button>
      </form>

      {/* รายการงาน */}
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className={`status-${t.status}`}>
            <div>
              <strong>{t.name}</strong> ({t.company})<br />
              กำหนดส่ง: {t.date}
              <br />
              สถานะ:{" "}
              {t.status === "pending" && "⏳ รอดำเนินการ"}
              {t.status === "complete" && "✅ เสร็จเรียบร้อย"}
              {t.status === "late" && "⚠️ เสร็จล่าช้า"}
              {t.date_complete && (
                <span> (เสร็จเมื่อ: {t.date_complete})</span>
              )}
            </div>

            <div className="task-actions">
              {t.status === "pending" && (
                <>
                  <input
                    type="date"
                    value={completeDates[t.id] || ""}
                    onChange={(e) =>
                      setCompleteDates({
                        ...completeDates,
                        [t.id]: e.target.value,
                      })
                    }
                  />
                  <button
                    className="complete-btn"
                    onClick={() => markComplete(t.id)}
                  >
                    เสร็จแล้ว
                  </button>
                </>
              )}
              <button
                className="delete-btn"
                onClick={() => deleteTask(t.id)}
              >
                ลบ
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
