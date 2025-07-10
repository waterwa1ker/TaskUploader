import { useEffect, useState } from 'react';
import { getConversionHistory } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getConversionHistory();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="history-page">
      <h1>Conversion History</h1>
      
      {history.length === 0 ? (
        <p>No conversion history yet.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Filename</th>
              <th>Pages</th>
              <th>Generated Apps</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleString()}</td>
                <td>{item.filename}</td>
                <td>{item.pages}</td>
                <td>{item.generatedApps}</td>
                <td>
                  <span className={`status ${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => window.open(item.links.learningApps, '_blank')}
                    disabled={item.status !== 'completed'}
                  >
                    View Apps
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistoryPage;
