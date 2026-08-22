import React from 'react';

function Footer() {
  return (
    <footer className="footer-component" id="footer-section">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Student Portfolio | ITUE301 Advanced Web Development Frameworks
      </p>
      <p className="footer-sub">
        Faculty of Technology and Engineering (FTE) | Charotar University of Science and Technology
      </p>
    </footer>
  );
}

export default Footer;
