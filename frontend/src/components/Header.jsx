import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">PDF2LearningApps</Link>
        <div className="nav-links">
          <Link to="/upload">Upload PDF</Link>
          <Link to="/history">History</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
