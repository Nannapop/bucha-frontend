import React, { useState, useEffect } from "react";
import "./InsertAboutText.css";
import ConfirmDialog from "../Components/Confirm/Confirm";

const InsertAboutText = ({ username }) => {
  const API = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [aboutData, setAboutData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // confirm state
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  // โหลดข้อมูล about
  const fetchAboutText = async () => {
    try {
      const res = await fetch(`${API}/about_text`);
      const data = await res.json();
      setAboutData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load About Text");
    }
  };

  useEffect(() => {
    fetchAboutText();
  }, []);

  // แปลงรูปเป็น base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  // submit → confirm
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !text) {
      setMessage("กรอกข้อมูลให้ครบ");
      return;
    }

    setConfirmMessage(
      editItem ? "ยืนยันการแก้ไขข้อมูลนี้?" : "ยืนยันการเพิ่มข้อมูลนี้?"
    );
    setConfirmAction(() => doSubmit);
    setShowConfirm(true);
  };

  // insert / update
  const doSubmit = async () => {
    setShowConfirm(false);
    try {
      const res = await fetch(
        editItem
          ? `${API}/update-about-text/${editItem.id}`
          : `${API}/insert-about-text`,
        {
          method: editItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ATitle: title,
            text,
            image,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessage(editItem ? "อัพเดตข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย");
        setEditItem(null);
        setTitle("");
        setText("");
        setImage(null);
        fetchAboutText();
      } else {
        setMessage(`Error: ${data.msg}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  // delete → confirm
  const handleDelete = (id) => {
    setConfirmMessage("คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?");
    setConfirmAction(() => () => doDelete(id));
    setShowConfirm(true);
  };

  const doDelete = async (id) => {
    setShowConfirm(false);
    try {
      const res = await fetch(`${API}/delete-about-text/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setMessage("ลบข้อมูลเรียบร้อย");
        fetchAboutText();
      } else {
        setMessage(`Error: ${data.msg}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  // edit
  const handleEdit = (item) => {
    setEditItem(item);
    setTitle(item.ATitle);
    setText(item.AText);
    setImage(item.AImage || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="insert-container">
      <h2>
        {editItem
          ? "แก้ไขข้อมูลหน้าเกี่ยวกับบริษัท"
          : "เพิ่มข้อมูลหน้าเกี่ยวกับบริษัท"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="หัวข้อ"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="ข้อความ/คำอธิบาย"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">
          {editItem ? "แก้ไข" : "เพิ่มข้อมูล"}
        </button>
      </form>

      <h3 className="crrnt">ข้อมูลหน้าบริษัทตอนนี้</h3>
      <ul className="about-list">
        {aboutData.length === 0 ? (
          <li>ไม่มีข้อมูล</li>
        ) : (
          aboutData.map((item) => (
            <li key={item.id} className="about-item">
              <div style={{ flex: 1 }}>
                <strong>{item.ATitle}</strong>
                <p>{item.AText}</p>
                {item.AImage && (
                  <img
                    src={`data:image/png;base64,${item.AImage}`}
                    alt="about"
                    style={{ width: 120, marginTop: 10, borderRadius: 8 }}
                  />
                )}
              </div>
              <div className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item)}
                >
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

export default InsertAboutText;
