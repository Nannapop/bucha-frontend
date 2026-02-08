import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/Buch-logo.png";
import menu_icon from "../../assets/menu-icon.png";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobilemenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobilemenu);
  };

  const closeMenu = () => {
    setMobileMenu(false); // ปิดเมนูทุกครั้งที่กดลิงก์
  };

  return (
    <nav className={`navbar ${sticky ? "dark-nav" : ""}`}>
      <img src={logo} alt="logo" className="logo" />
      <ul className={mobilemenu ? "" : "hide-mobile-menu"}>
        <li>
          <Link to="/" onClick={closeMenu}>หน้าหลัก</Link>
        </li>
        <li>
          <Link to="/Aboutus" onClick={closeMenu}>เกี่ยวกับเรา</Link>
        </li>
        <li>
          <Link to="/Services" onClick={closeMenu}>บริการ</Link>
        </li>
        <li>
          <Link to="/Works" onClick={closeMenu}>ผลงาน</Link>
        </li>
        <li>
          <Link to="/Contactus" className="btn" onClick={closeMenu}>
            ติดต่อเรา
          </Link>
        </li>
      </ul>
      <img
        src={menu_icon}
        alt="menu"
        className="menu-icon"
        onClick={toggleMenu}
      />
    </nav>
  );
};

export default Navbar;
