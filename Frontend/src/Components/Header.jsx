import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-container">
      <div className="navbar-container">
        <nav className="navbar">
          <Link className="navbar-item" to="/">
            <div className="navbar-button">HOME</div>
            <div className="navbar-button-background"></div>
          </Link>
          <Link className="navbar-item" to="/jobs">
            <div className="navbar-button">JOBS</div>
            <div className="navbar-button-background"></div>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;