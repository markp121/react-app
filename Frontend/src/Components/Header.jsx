import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-alt.png";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar-container">
        <nav className="navbar">
          <Link className="navbar-item" to="/">
            <div className="navbar-button first">HOME</div>
            <div className="navbar-button-background first"></div>
          </Link>
          <Link className="navbar-item" to="/profiles">
            <div className="navbar-button">PROFILES</div>
            <div className="navbar-button-background"></div>
          </Link>
          <Link className="navbar-item" to="/jobs">
            <div className="navbar-button">JOBS</div>
            <div className="navbar-button-background"></div>
          </Link>
          <Link className="navbar-item" to="/investment-calculator">
            <div className="navbar-button last">CALCULATOR</div>
            <div className="navbar-button-background last"></div>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;