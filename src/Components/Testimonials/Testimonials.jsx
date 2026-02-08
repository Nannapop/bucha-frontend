import React, { useRef, useState, useEffect } from "react";
import "./Testimonials.css";
import next_icon from "../../assets/next-icon.png";
import back_icon from "../../assets/back-icon.png";
import Title from "../Title/Title";

const Testimonials = () => {
  const slider = useRef();
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);

  const cardsPerView = 2; // กำหนดว่าหน้าจอหนึ่งครั้งได้ 2 การ์ด

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Fetch testimonials error:", err));
  }, []);

  const slideForward = () => {
    if (index < testimonials.length - cardsPerView) {
      setIndex(index + 1);
    }
  };

  const slideBackward = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    if (slider.current) {
      const shift = (100 / cardsPerView) * index; // คิดตามจำนวนการ์ดที่โชว์
      slider.current.style.transform = `translateX(-${shift}%)`;
    }
  }, [index, cardsPerView]);

  return (
    <div className="tes-container">
      <Title subTitle="บทวิจารณ์" title="รีวิวจากผู้ว่าจ้าง" />
      <div className="testimonials">
        <img
          src={next_icon}
          alt=""
          className="next-btn"
          onClick={slideForward}
        />
        <img
          src={back_icon}
          alt=""
          className="back-btn"
          onClick={slideBackward}
        />
        <div className="slider">
          <ul ref={slider}>
            {testimonials.map((t) => (
              <li key={t.id}>
                <div className="slide">
                  <div className="user-info">
                    {t.tes_image && (<img src={`data:image/png;base64,${t.tes_image}`} alt={t.name}/>
                    )}
                    <div>
                      <h3>{t.name}</h3>
                      <span>{t.role}</span>
                    </div>
                  </div>
                  <p>{t.tes_text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
