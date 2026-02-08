import React, { useState, useEffect } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

import hero1 from "../../assets/hero-home.jpg";
import hero2 from "../../assets/hero-aboutus.jpg";
import hero3 from "../../assets/hero-1-3.jpg";
const Hero = () => {
  const images = [hero1, hero2, hero3];
  const [index, setIndex] = useState(0);

  // Auto slide ทุก 4 วิ
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="hero">
      {/* LEFT */}
      <div className="hero-left">
        <div className="slider-arrow left" onClick={prevSlide}>&lt;</div>

        <h1>ห้างหุ้นส่วนจำกัด</h1>
        <h1>บูชาเอ็นจิเนียริ่งแอนด์ซัพพลาย</h1>
        <p>
          เราบริการให้คำปรึกษาปัญหางานพื้น งานผนัง ระบบต่างๆ 
          โดยมีทีมช่างเทคนิคที่มีประสบการณ์เฉพาะด้านโดยตรง
        </p>

        <div className="hero-buttons">
          <Link to="/Contactus" className="btn btn-primary">ติดต่อเรา</Link>
          <Link to="/Aboutus" className="btn btn-secondary">เกี่ยวกับเรา</Link>
        </div>
      </div>

      {/* RIGHT — SLIDER */}
      <div className="hero-right">
        <div className="slider-container">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <img src={img} key={i} alt={`slide-${i}`} />
            ))}
          </div>
        </div>

        <div className="slider-arrow right" onClick={nextSlide}>&gt;</div>
      </div>
    </div>
  );
};

export default Hero;
