import React, { useState, useEffect } from "react";
import "./InsertAboutText.css";
import ConfirmDialog from "../Components/Confirm/Confirm";

const ManageGallery = () => {
  const API = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [galleryData, setGalleryData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // confirm state
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  // โหลดข้อมูล gallery
  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API}/gallery`);
      const data = await res.json();
      setGalleryData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load gallery");
    }
  };

  useEffect(() => {
    fetchGallery();
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
    if (!name || !description) {
      setMessage("กรอกข้อมูลให้ครบ");
      return;
    }

    setConfirmMessage(
      editItem ? "ยืนยันการแก้ไขรูปภาพนี้?" : "ยืนยันการเพิ่มรูปภาพนี้?"
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
          ? `${API}/gallery/${editItem.id}`
          : `${API}/gallery`,
        {
          method: editItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, image }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessage(editItem ? "อัพเดตข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย");
        setEditItem(null);
        setName("");
        setDescription("");
        setImage(null);
        fetchGallery();
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
    setConfirmMessage("คุณแน่ใจหรือไม่ที่จะลบรูปภาพนี้?");
    setConfirmAction(() => () => doDelete(id));
    setShowConfirm(true);
  };

  const doDelete = async (id) => {
    setShowConfirm(false);
    try {
      const res = await fetch(`${API}/gallery/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setMessage("ลบข้อมูลเรียบร้อย");
        fetchGallery();
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
    setName(item.name);
    setDescription(item.description);
    setImage(item.image || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="insert-container">
      <h2>{editItem ? "แก้ไขรูปภาพ" : "เพิ่มรูปภาพ"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ชื่อรูปภาพ (ไม่มีให้ใส่อะไรก็ได้ แต่อย่าปล่อยว่าง)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="คำอธิบายรูปภาพ (ไม่มีให้ใส่อะไรก็ได้ แต่อย่าปล่อยว่าง)"
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

      <h3 className="crrnt">รูปภาพในแกลอรี่ตอนนี้</h3>
      <ul className="about-list">
        {galleryData.length === 0 ? (
          <li>ยังไม่มีข้อมูล</li>
        ) : (
          galleryData.map((item) => (
            <li key={item.id} className="about-item">
              <div style={{ flex: 1 }}>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                {item.image && (
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt="gallery"
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

export default ManageGallery;
