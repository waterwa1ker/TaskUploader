import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Convert PDF to Interactive Exercises</h1>
      <p>Transform your textbook PDFs into LearningApps.org activities automatically</p>
      <Link to="/upload" className="cta-button">Start Converting</Link>
    </div>
  );
}

export default HomePage;
