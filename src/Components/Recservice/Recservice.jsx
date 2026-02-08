import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Recservice.css";
import Title from "../Title/Title";
import White_arrow from "../../assets/white-arrow.png";

const Recservice = () => {
  const [services, setServices] = useState([]);

const fetchServices = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/recservice`);
    const data = await res.json();
    setServices(Array.isArray(data) ? data.slice(0, 3) : []);
  } catch (err) {
    console.error("Failed to load recservice:", err);
  }
};


  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
        <div className="recservice">
          <div className="c-title">
          <Title subTitle="บริการของเรา" title="เราทำอะไรบ้าง" />
          </div>
        {services.map(service => (
            <div key={service.id} className="rec-card">
                <div className="service-circle">
                    <img src={`data:image/jpeg;base64,${service.serimg}`} alt={service.title} className="service-circle-img" />
                </div>
                    <h2>{service.title}</h2>
            </div>
  ))}
            <div>
                <Link to="/Services" className="btn dark-btn more-btn">ดูเพิ่มเติม<img src={White_arrow} alt="" /></Link>
            </div>
        </div>
    </div>
  );
};

export default Recservice;
