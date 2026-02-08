import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Programs.css";
import Title from "../Title/Title";

const Programs = () => {
  const [services, setServices] = useState([]);
  const [lightbox, setLightbox] = useState({ isOpen: false, item: null });

const fetchServices = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/recservice`);
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to fetch services:", err);
  }
};


  useEffect(() => {
    fetchServices();
  }, []);

  const openLightbox = (item) => {
    setLightbox({ isOpen: true, item });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, item: null });
  };

  return (
    <div className="pg-container">
      <Title subTitle="ครอบคลุมทุกความต้องการของคุณ" title="งานบริการคุณภาพที่เราภูมิใจนำเสนอ" />
    <div className="programs">
      {services.length === 0 ? (
        <p>ยังไม่มีข้อมูลบริการ</p>
      ) : (
        services.map((service) => (
          <div
            key={service.id}
            className="program"
            onClick={() => openLightbox(service)}
          >
            {service.serimg && (
              <img
                src={`data:image/jpeg;base64,${service.serimg}`}
                alt={service.title}
                className="program-img"
              />
            )}
            <div className="caption">
              <h3>{service.title}</h3>
            </div>
          </div>
        ))
      )}

      {lightbox.isOpen && lightbox.item && (
        <div className="programs-lightbox" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-left">
              <img
                src={`data:image/jpeg;base64,${lightbox.item.serimg}`}
                alt={lightbox.item.title}
              />
            </div>
            <div className="lightbox-right">
              <h2>{lightbox.item.title}</h2>
              <p>{lightbox.item.description}</p>
              <Link to="/Contactus" className="btn dark-btn btn-gap">
                ติดต่อเรา
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Programs;
