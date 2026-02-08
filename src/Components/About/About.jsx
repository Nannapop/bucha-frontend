import React, { useEffect, useState } from "react";
import "./About.css";
import Title from "../Title/Title";

const About = ({ setPlayState }) => {
  const [aboutItem, setAboutItem] = useState(null);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/about_text`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setAboutItem(data[0]);
      }
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);


  if (!aboutItem) return <p>Loading...</p>;

  return (
    <div className="abt-container">
      <Title subTitle="สร้างสรรค์ผลงานด้วยความตั้งใจในทุกขั้นตอน" title="บริษัทของเรา" />
      <div className="about">
        <div className="about-left">
          {aboutItem.AImage ? (
            <img
              src={`data:image/png;base64,${aboutItem.AImage}`}
              alt={aboutItem.ATitle}
              className="about-img"
            />
          ) : (
            <div className="about-img placeholder">No Image</div>
          )}
        </div>
        <div className="about-right">
          <h3>{aboutItem.ATitle}</h3>
          <p>{aboutItem.AText}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
