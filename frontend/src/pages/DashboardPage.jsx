import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserStats, getRecentConversions } from '../services/api';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentConversions, setRecentConversions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, conversionsData] = await Promise.all([
        getUserStats(),
        getRecentConversions()
      ]);
      setStats(statsData);
      setRecentConversions(conversionsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p style={{fontSize: '1.05rem', color: 'var(--muted)', marginBottom: 24, textAlign: 'center', maxWidth: 340}}>
        Welcome back! Here's your conversion activity overview.
      </p>
      
      {error && <Alert message={error} type="error" />}

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/upload" className="action-button primary">
            <span className="action-icon">📄</span>
            <span>Upload New PDF</span>
          </Link>
          <Link to="/history" className="action-button secondary">
            <span className="action-icon">📊</span>
            <span>View History</span>
          </Link>
          <Link to="/profile" className="action-button secondary">
            <span className="action-icon">👤</span>
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalConversions}</div>
            <div className="stat-label">Total Conversions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.successfulConversions}</div>
            <div className="stat-label">Successful</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalPages}</div>
            <div className="stat-label">Pages Processed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalApps}</div>
            <div className="stat-label">Apps Created</div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        {recentConversions.length === 0 ? (
          <p style={{color: 'var(--muted)', textAlign: 'center', marginTop: 16}}>
            No recent conversions. Start by uploading your first PDF!
          </p>
        ) : (
          <div className="activity-list">
            {recentConversions.slice(0, 5).map((conversion) => (
              <div key={conversion.id} className="activity-item">
                <div className="activity-icon">
                  {conversion.status === 'completed' ? '✅' : 
                   conversion.status === 'failed' ? '❌' : '⏳'}
                </div>
                <div className="activity-content">
                  <div className="activity-title">{conversion.filename}</div>
                  <div className="activity-details">
                    {conversion.pages} pages • {conversion.generatedApps} apps • 
                    {new Date(conversion.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="activity-status">
                  <span className={`status ${conversion.status}`}>
                    {conversion.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        {recentConversions.length > 5 && (
          <div style={{textAlign: 'center', marginTop: 16}}>
            <Link to="/history" style={{color: 'var(--primary-dark)', textDecoration: 'underline'}}>
              View all conversions →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage; 