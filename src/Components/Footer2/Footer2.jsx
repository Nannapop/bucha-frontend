import React, { useEffect } from "react";
import "./Footer2.css";
import logo from "../../assets/Buch-logo.png";
import qrcode from "../../assets/qr-line.jpg";
import { FaLine, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // 👈 เพิ่มตรงนี้

const Footer2 = () => {
  useEffect(() => {
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <footer className="footer2">
      <div className="footer2-container">
        {/* โลโก้ */}
        <div className="footer2-logo">
          <img src={logo} alt="Company Logo" />
        </div>

        {/* Connect */}
        <div className="footer2-connect">
          <h3>Connect</h3>
          <p className="phone">
            <FaPhoneAlt className="footer-icon" /> 087-532-8087
          </p>
          <p className="phone">
            <FaPhoneAlt className="footer-icon" /> 065-410-0562
          </p>
          <p>
            <FaEnvelope className="footer-icon" /> buchaengineering@hotmail.com
          </p>
          <p>
            <FaLine className="footer-icon line-icon" /> Line ID: bucha_en
          </p>
        </div>

        {/* QR Code */}
        <div className="footer2-qr">
          <h3>Chat Line</h3>
          <img src={qrcode} alt="Line QR Code" />
        </div>

        {/* Facebook Page */}
        <div className="footer2-fb">
          <h3>Follow us</h3>
          <div
            className="fb-page"
            data-href="https://www.facebook.com/profile.php?id=100054898894103"
            data-tabs="timeline"
            data-height="300"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote
              cite="https://www.facebook.com/profile.php?id=100054898894103"
              className="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/profile.php?id=100054898894103">
                JA Colour Rich
              </a>
            </blockquote>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
