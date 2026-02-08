import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Minigallery.css';
import White_arrow from '../../assets/white-arrow.png';
import Title from '../Title/Title';

const Gallery = () => {
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '' });
  const [gallery, setGallery] = useState([]);

  // โหลดรูปจาก backend
const fetchGallery = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/gallery`);
    const data = await res.json();
    setGallery(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to load gallery:", err);
  }
};


  useEffect(() => {
    fetchGallery();
  }, []);

  const openLightbox = (src) => setLightbox({ isOpen: true, src });
  const closeLightbox = () => setLightbox({ isOpen: false, src: '' });

  return (
    <div className='mg-container'>
      <Title subTitle="แกลอรี่" title="ภาพภ่ายงาน" />
    <div className='mgallery'>
      <div className="gallery">
        {gallery.length === 0 ? (
          <p>ยังไม่มีรูปใน Gallery</p>
        ) : (
          gallery.slice(0, 8).map((item) => ( 
            <img
              key={item.id}
              src={`data:image/jpeg;base64,${item.image}`}
              alt={item.name}
              onClick={() => openLightbox(`data:image/jpeg;base64,${item.image}`)}
            />
          ))
        )}
        </div>

        <Link to="/works" className="btn dark-btn">ดูเพิ่มเติม<img src={White_arrow} alt="" />
        </Link>

      {lightbox.isOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <img src={lightbox.src} alt="Expanded" />
        </div>
      )}
    </div>
    </div>
  );
};

export default Gallery;
