import React from 'react'
import './Footer.css'
import logo from "../../assets/Buch-logo.png";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-left'>
        <img src={logo} alt="Bucha Logo" className="footer-logo" />
        <p>© 2025 Bucha Engineering & Supply</p>
      </div>
      <ul>
        <li>Terms of Service</li>
        <li>Privacy Policy</li>
      </ul>
    </footer>
  )
}

export default Footer
