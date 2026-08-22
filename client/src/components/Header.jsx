import React from 'react';

function Header({ name, title = "Student Portfolio & Practical Suite", themeColor }) {
  return (
    <header 
      className="header-component glass-card"
      style={themeColor ? { borderColor: themeColor } : {}}
      id="header-section"
    >
      <span className="header-badge">CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY</span>
      <h1 className="header-title">{title}</h1>
      <p className="header-subtitle">Developed by <strong>{name || "Shreeja Patel"}</strong> | ITUE301 - Advanced Web Development Frameworks</p>
    </header>
  );
}

export default Header;
