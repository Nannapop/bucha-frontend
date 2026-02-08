import React from "react";
import "./Whyus.css";
import { FaComments, FaUserCog, FaTools, FaShieldAlt } from "react-icons/fa";

const Whyus = () => {
  const items = [
    {
      icon: <FaComments />,
      text: "เรายินดีให้คำปรึกษาทุกปัญหางานพื้น ผนัง พร้อมสำรวจหน้างานให้โดยไม่มีค่าใช้จ่าย"
    },
    {
      icon: <FaUserCog />,
      text: "เรามีทีมช่างที่มีฝีมือและประสบการณ์โดยตรง อีกทั้งยังผ่านการฝึกอบรมด้านงานพื้นจากต่างประเทศ"
    },
    {
      icon: <FaTools />,
      text: "เรามีบริการหลังการขายที่ดีเยี่ยม บริการเข้าซ่อมงานลูกค้าในระยะประกันของบริษัท ภายใน 10 วัน"
    },
    {
      icon: <FaShieldAlt />,
      text: "เรามีการรับประกันงานนานสูงสุด 2 ปี"
    },
  ];

  return (
    <div className="whyus-section">
      <h2 className="whyus-title">
        ทำไมต้องเลือก <span>BUCHA ?</span>
      </h2>

      <div className="whyus-grid">
        {items.map((item, index) => (
          <div className="whyus-card" key={index}>
            <div className="whyus-icon">{item.icon}</div>
            <p className="whyus-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Whyus;
