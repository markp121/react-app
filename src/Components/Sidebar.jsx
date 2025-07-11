import React, { useState } from "react";

const Sidebar = ({ sidebarClass, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className={`button neutral sidebarBtn ${sidebarClass}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <i className="bi bi-x"></i> : <i className="bi bi-list"></i>}
      </button>
      <aside className={`sidebar ${sidebarClass} ${isOpen ? "open" : "close"}`}>
        <div className="sidebar-content-container">
          <div className="sidebar-content">
          {children}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
