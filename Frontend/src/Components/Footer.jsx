import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-alt.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content-container">
        <div className="footer-logo-container">
          <Link className="footer-logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="quick-links">
            <h2>Quick links</h2>
            <nav className="links-container">
              <Link to="/">
                <i className="bi bi-caret-right-fill"></i>
                <span className="">Home</span>
              </Link>
              <Link  to="profiles">
                <i className="bi bi-caret-right-fill"></i>
                <span className="underline-offset-2 active:underline">Profiles</span>
              </Link>
              <Link to="jobs">
                <i className="bi bi-caret-right-fill"></i>
                <span className="underline-offset-2 active:underline">Jobs</span>
              </Link>
              <Link to="investment-calculator">
                <i className="bi bi-caret-right-fill"></i>
                <span className="underline-offset-2 active:underline">Calculator</span>
              </Link>
            </nav>
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://www.x.com" target="_blank">
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>
        <div className="rights-container">
          <p className="py-6 opacity-50">TaskPilot Ltd 2025 &copy;</p>
          <p className="py-6 opacity-50">Designed by Mark Powell</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
