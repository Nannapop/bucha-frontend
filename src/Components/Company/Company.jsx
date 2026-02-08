import React, { useEffect, useState } from "react";
import "./Company.css";
import Title from "../Title/Title";

const Company = () => {
  const [companies, setCompanies] = useState([]);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/company`)
    .then((res) => res.json())
    .then((data) => {
      setCompanies(Array.isArray(data) ? data : []);
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);


  // ทำให้เลื่อนวนๆ
  const loopCompanies = [...companies, ...companies, ...companies];

  return (
    <div className="company-container">
      <Title subTitle="เราได้รับความไว้วางใจจากบริษัทชั้นนำ" title="บริษัทที่ร่วมงาน" />
      <div className="company-slider">
        <div className="company-track">
          {loopCompanies.map((c, idx) => (
            <div key={idx} className="company-card">
              {c.icon && (
                <img
                  src={`data:image/png;base64,${c.icon}`}
                  alt={c.name}
                  className="company-icon"
                />
              )}
              <p className="company-name">{c.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company;
