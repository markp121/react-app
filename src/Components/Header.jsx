import React from 'react';

const Header = () => {
  return (
    <header className="header-container">
      <div className="navbar-container">
        <nav className="navbar">
          <button className="navbar-item">
            <div className="navbar-button">HOME</div>
            <div className="navbar-button-background"></div>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;