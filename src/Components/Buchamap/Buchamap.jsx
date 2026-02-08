import React from "react";
import "./Buchamap.css";
import Title from "../Title/Title";

const BuchaMap = () => {
  return (
    <div className="map-section">
      <div className="map-container">
        <Title title="แผนที่บริษัท" />
        <div className="map-frame">
          <iframe
            title="bucha-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.779685890271!2d100.9242067!3d14.7834876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311e0b0bd351bba5%3A0xd5b5ce7cb2c2bf13!2z4Lir4LmJ4Liy4LiH4Lir4Li44LmJ4LiZ4Liq4LmI4Lin4LiZIOC4iOC5jeC4siDguqTguYXguYHguKfguLTguYDguJXguK3guIfguLHguJQ!5e0!3m2!1sth!2sth!4v1732510000000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default BuchaMap;
