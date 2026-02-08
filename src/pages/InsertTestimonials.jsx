import React, { useState, useEffect } from "react";
import "./InsertAboutText.css";
import ConfirmDialog from "../Components/Confirm/Confirm";

const API_URL = import.meta.env.VITE_API_URL;

const InsertTestimonials = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [tesText, setTesText] = useState("");
  const [tesImage, setTesImage] = useState(null);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  // confirm dialog
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  // โหลด testimonials
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/testimonials`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load reviews");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // แปลงรูปเป็น base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setTesImage(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  // submit -> confirm
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role || !tesText) {
      setMessage("กรอกข้อมูลให้ครบ");
      return;
    }

    setConfirmMessage(
      editId ? "ยืนยันการแก้ไขรีวิวนี้?" : "ยืนยันการเพิ่มรีวิวนี้?"
    );
    setConfirmAction(() => doSubmit);
    setShowConfirm(true);
  };

  // insert / update
  const doSubmit = async () => {
    setShowConfirm(false);
    try {
      const url = editId
        ? `${API_URL}/update-testimonial/${editId}`
        : `${API_URL}/insert-testimonial`;

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          tes_text: tesText,
          tes_image: tesImage,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setMessage(editId ? "อัพเดตข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย");
        setName("");
        setRole("");
        setTesText("");
        setTesImage(null);
        setEditId(null);
        fetchData();
      } else {
        setMessage(result.msg || "เกิดข้อผิดพลาด");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  // delete -> confirm
  const handleDelete = (id) => {
    setConfirmMessage("คุณแน่ใจหรือไม่ที่จะลบรีวิวนี้?");
    setConfirmAction(() => () => doDelete(id));
    setShowConfirm(true);
  };

  const doDelete = async (id) => {
    setShowConfirm(false);
    try {
      const res = await fetch(`${API_URL}/delete-testimonial/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        setMessage("ลบข้อมูลเรียบร้อย");
        fetchData();
      } else {
        setMessage(result.msg || "ลบไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  // edit
  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setRole(item.role);
    setTesText(item.tes_text);
    setTesImage(item.tes_image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="insert-container">
      <h2>{editId ? "แก้ไขรีวิว" : "เพิ่มรีวิวใหม่"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ชื่อ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="ตำแหน่ง/ความสัมพันธ์"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <textarea
          placeholder="ข้อความรีวิว"
          value={tesText}
          onChange={(e) => setTesText(e.target.value)}
          rows={4}
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">
          {editId ? "แก้ไข" : "เพิ่มข้อมูล"}
        </button>
      </form>

      <h3 className="crrnt">รายการรีวิวปัจจุบัน</h3>
      <ul className="about-list">
        {data.length === 0 ? (
          <li>ไม่มีข้อมูล</li>
        ) : (
          data.map((item) => (
            <li key={item.id} className="about-item">
              <div style={{ flex: 1 }}>
                {item.tes_image && (
                  <img
                    src={`data:image/png;base64,${item.tes_image}`}
                    alt="user"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      marginBottom: 8,
                    }}
                  />
                )}
                <strong>{item.name}</strong>
                <br />
                <span>{item.role}</span>
                <p>{item.tes_text}</p>
              </div>

              <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                  แก้ไข
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  ลบ
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {message && <p className="insert-message">{message}</p>}

      <ConfirmDialog
        show={showConfirm}
        message={confirmMessage}
        onConfirm={confirmAction}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default InsertTestimonials;
