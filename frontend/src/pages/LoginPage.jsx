import { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser(username, password);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <p style={{fontSize: '1.05rem', color: 'var(--muted)', marginBottom: 18, textAlign: 'center', maxWidth: 340}}>
        Enter your credentials to access your account.
      </p>
      {error && <Alert message={error} type="error" />}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div style={{marginTop: 16, color: 'var(--muted)', fontSize: '0.98rem'}}>
        Don't have an account? <a href="/register" style={{color: 'var(--primary-dark)', textDecoration: 'underline'}}>Register</a>
      </div>
    </div>
  );
}

export default LoginPage; 