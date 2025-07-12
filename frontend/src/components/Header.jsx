import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem('token'));
    window.addEventListener('storage', () => {
      setIsAuth(!!localStorage.getItem('token'));
    });
    return () => window.removeEventListener('storage', () => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">PDF2LearningApps</Link>
        <div className="nav-links">
          {isAuth ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/upload">Upload PDF</Link>
              <Link to="/history">History</Link>
              <div className="user-menu">
                <Link to="/profile">Profile</Link>
                <Link to="/settings">Settings</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
