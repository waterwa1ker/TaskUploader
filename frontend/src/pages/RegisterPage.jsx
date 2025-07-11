import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await registerUser(username, password);
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      <p style={{fontSize: '1.05rem', color: 'var(--muted)', marginBottom: 18, textAlign: 'center', maxWidth: 340}}>
        Create a new account to start converting your PDFs.
      </p>
      {error && <Alert message={error} type="error" />}
      {success && <Alert message={success} type="success" />}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      <div style={{marginTop: 16, color: 'var(--muted)', fontSize: '0.98rem'}}>
        Already have an account? <a href="/login" style={{color: 'var(--primary-dark)', textDecoration: 'underline'}}>Login</a>
      </div>
    </div>
  );
}

export default RegisterPage; 