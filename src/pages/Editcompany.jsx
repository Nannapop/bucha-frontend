import React, { useState, useEffect } from "react";
import "./InsertAboutText.css";
import ConfirmDialog from "../Components/Confirm/Confirm";

const InsertCompany = () => {
  const API = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [message, setMessage] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // confirm state
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  // โหลดข้อมูลบริษัท
  const fetchCompanies = async () => {
    try {
      const res = await fetch(`${API}/company`);
      const data = await res.json();
      setCompanyData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load company");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // แปลงรูปเป็น base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setIcon(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  // submit → เปิด confirm
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return setMessage("ใส่ชื่อบริษัท");

    setConfirmMessage(
      editItem ? "ยืนยันการแก้ไขบริษัทนี้?" : "ยืนยันการเพิ่มบริษัทนี้?"
    );
    setConfirmAction(() => doSubmit);
    setShowConfirm(true);
  };

  // insert / update
  const doSubmit = async () => {
    setShowConfirm(false);
    try {
      const res = await fetch(
        editItem ? `${API}/company/${editItem.id}` : `${API}/company`,
        {
          method: editItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, icon }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessage(editItem ? "อัพเดตข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย");
        setEditItem(null);
        setName("");
        setIcon(null);
        fetchCompanies();
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
    setConfirmMessage("คุณแน่ใจหรือไม่ที่จะลบบริษัทนี้?");
    setConfirmAction(() => () => doDelete(id));
    setShowConfirm(true);
  };

  const doDelete = async (id) => {
    setShowConfirm(false);
    try {
      const res = await fetch(`${API}/company/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setMessage("ลบข้อมูลเรียบร้อย");
        fetchCompanies();
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
    setIcon(item.icon || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="insert-container">
      <h2>{editItem ? "แก้ไขบริษัทที่ร่วมงาน" : "เพิ่มบริษัทที่ร่วมงาน"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ชื่อบริษัท"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">
          {editItem ? "แก้ไข" : "เพิ่มข้อมูล"}
        </button>
      </form>

      <h3 className="crrnt">ข้อมูลบริษัทที่ร่วมงานตอนนี้</h3>
      <ul className="about-list">
        {companyData.length === 0 ? (
          <li>ไม่มีข้อมูล</li>
        ) : (
          companyData.map((item) => (
            <li key={item.id} className="about-item">
              <div style={{ flex: 1 }}>
                <strong>{item.name}</strong>
                {item.icon && (
                  <img
                    src={`data:image/jpeg;base64,${item.icon}`}
                    alt={item.name}
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

export default InsertCompany;
