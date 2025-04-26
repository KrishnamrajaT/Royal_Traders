import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TelegramIcon from "@mui/icons-material/Telegram";
import Divider from "@mui/material/Divider";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="logo-section">
            <div className="logo">LOGO</div>
            <div className="slogan">Royal Traders</div>
          </div>
        </div>

        <div className="footer-section">
          <h4>SERVICES</h4>
          <ul>
            <li className="services">Live Trading</li>
            <li className="services">Classes</li>
            <li className="services">Risk Management</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>ABOUT US</h4>
          <ul>
            <li>CONTACT US</li>
            <li>AFFILIATES</li>
            <li>RESOURCES</li>
          </ul>
        </div>
      </div>
      <div className="divider"></div>
      <div style={{ textAlign: "center" }}>
        <InstagramIcon className="footer-icons" />
        <FacebookRoundedIcon
          className="footer-icons facebook-icon"

        />
        <TelegramIcon className="footer-icons" />
        <div className="copyright">©Copyright. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
