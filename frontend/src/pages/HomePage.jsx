import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Convert PDF to Interactive Exercises</h1>
      <p style={{fontSize: '1.15rem', color: 'var(--muted)', marginBottom: 24, textAlign: 'center', maxWidth: 340}}>
        Transform your textbook PDFs into <b>LearningApps.org</b> activities automatically. Fast, easy, and interactive!
      </p>
      <a href="/upload" className="cta-button">Start Converting</a>
    </div>
  );
}

export default HomePage;
