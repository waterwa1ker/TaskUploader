import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>PDF to LearningApps</h4>
          <p>Automatically convert textbook PDFs into interactive exercises</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/upload">Upload PDF</a></li>
            <li><a href="/history">Conversion History</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>support@pdftolearningapps.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} PDF to LearningApps. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
