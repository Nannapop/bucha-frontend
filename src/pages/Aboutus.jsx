import React, { useEffect, useState } from 'react';
import Hero2 from '../Components/Hero2/Hero2';
import Title from '../Components/Title/Title';
import './Aboutus.css';
import Company from "../Components/Company/Company";
import Testimonials from "../Components/Testimonials/Testimonials";

const Aboutus = () => {
  const [atextData, setaTextData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/about_text`)
      .then(res => res.json())
      .then(data => setaTextData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Hero2 />
      <div className="abt-container">
        <Title subTitle="สร้างสรรค์ผลงานด้วยความตั้งใจในทุกขั้นตอน" title="บริษัทของเรา" />
        <div className="aboutus-wrapper">
          {atextData.length > 0 ? (
            atextData.map((item, index) => (
              <div
                key={item.id}
                className={`about-section ${index % 2 === 1 ? 'reverse' : ''}`}
              >
                <div className="about-left">
                  {item.AImage ? (
                    <img
                      src={`data:image/png;base64,${item.AImage}`}
                      alt={item.ATitle}
                      className="about-img"
                    />
                  ) : (
                    <div className="about-img placeholder">No Image</div>
                  )}
                </div>
                <div className="about-right">
                  <h3>{item.ATitle}</h3>
                  <p>{item.AText}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
          <Company/>
          <Testimonials />
    </div>
  );
};

export default Aboutus;
