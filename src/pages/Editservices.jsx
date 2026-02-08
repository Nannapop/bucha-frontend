import React, { useState, useEffect } from "react";
import "./InsertAboutText.css";
import ConfirmDialog from "../Components/Confirm/Confirm";

const ManageRecservice = () => {
  const API = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // confirm state
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  // โหลดข้อมูลบริการ
  const fetchRecservice = async () => {
    try {
      const res = await fetch(`${API}/recservice`);
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load service");
    }
  };

  useEffect(() => {
    fetchRecservice();
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
    if (!title || !description) {
      setMessage("กรอกข้อมูลให้ครบ!");
      return;
    }

    setConfirmMessage(
      editItem ? "ยืนยันการแก้ไขบริการนี้?" : "ยืนยันการเพิ่มบริการนี้?"
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
          ? `${API}/recservice/${editItem.id}`
          : `${API}/recservice`,
        {
          method: editItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            serimg: image,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessage(editItem ? "แก้ไขข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย");
        setEditItem(null);
        setTitle("");
        setDescription("");
        setImage(null);
        fetchRecservice();
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
    setConfirmMessage("คุณแน่ใจหรือไม่ที่จะลบบริการนี้?");
    setConfirmAction(() => () => doDelete(id));
    setShowConfirm(true);
  };

  const doDelete = async (id) => {
    setShowConfirm(false);
    try {
      const res = await fetch(`${API}/recservice/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setMessage("ลบข้อมูลเรียบร้อย");
        fetchRecservice();
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
    setTitle(item.title);
    setDescription(item.description);
    setImage(item.serimg || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="insert-container">
      <h2>{editItem ? "แก้ไขบริการ" : "เพิ่มบริการ"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ชื่อบริการ"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="คำอธิบาย"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">
          {editItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
        </button>
      </form>

      <h3 className="crrnt">บริการที่แสดงตอนนี้</h3>
      <ul className="about-list">
        {services.length === 0 ? (
          <li>ไม่มีข้อมูล</li>
        ) : (
          services.map((item) => (
            <li key={item.id} className="about-item">
              <div style={{ flex: 1 }}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                {item.serimg && (
                  <img
                    src={`data:image/jpeg;base64,${item.serimg}`}
                    alt={item.title}
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

export default ManageRecservice;
