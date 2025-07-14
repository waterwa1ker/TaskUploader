import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, sendEmailVerification, getEmailStatus } from '../services/api';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const [emailVerified, setEmailVerified] = useState(false);
  const [emailStatusLoading, setEmailStatusLoading] = useState(true);
  const [emailStatusError, setEmailStatusError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchEmailStatus();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setFormData({
        username: data.username || '',
        email: data.email || '',
        firstName: data.firstName || '',
        lastName: data.lastName || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailStatus = async () => {
    setEmailStatusLoading(true);
    setEmailStatusError('');
    try {
      const data = await getEmailStatus();
      setEmailVerified(data.verified);
    } catch (err) {
      setEmailStatusError('Failed to get email status');
    } finally {
      setEmailStatusLoading(false);
    }
  };

  const handleSendVerification = async () => {
    setError('');
    setSuccess('');
    setVerificationSent(false);
    try {
      await sendEmailVerification(formData.email);
      setVerificationSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await updateUserProfile(formData);
      setSuccess('Profile updated successfully!');
      setEditing(false);
      fetchProfile(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p style={{fontSize: '1.05rem', color: 'var(--muted)', marginBottom: 18, textAlign: 'center', maxWidth: 340}}>
        Manage your account settings and personal information.
      </p>
      
      {error && <Alert message={error} type="error" />}
      {success && <Alert message={success} type="success" />}

      <div className="profile-info">
        <div className="profile-section">
          <h3>Account Information</h3>
          <div className="info-item">
            <label>User ID:</label>
            <span>{profile?.id}</span>
          </div>
          <div className="info-item">
            <label>Role:</label>
            <span className="role-badge">{profile?.role}</span>
          </div>
          <div className="info-item">
            <label>Email:</label>
            <span>{profile?.email}</span>
            {emailStatusLoading ? (
              <span style={{marginLeft: 8, color: 'var(--muted)', fontSize: '0.9rem'}}>Checking...</span>
            ) : emailVerified ? (
              <span style={{marginLeft: 8, color: 'var(--success)', fontSize: '0.9rem'}}>Verified</span>
            ) : (
              <span style={{marginLeft: 8, color: 'var(--error)', fontSize: '0.9rem'}}>Not verified</span>
            )}
          </div>
          {!emailVerified && !emailStatusLoading && (
            <div style={{marginTop: 8}}>
              <button onClick={handleSendVerification} className="secondary-button" style={{fontSize: '0.95rem'}}>
                {verificationSent ? 'Verification Email Sent!' : 'Send Verification Email'}
              </button>
            </div>
          )}
          {emailStatusError && <div style={{color: 'var(--error)', fontSize: '0.9rem', marginTop: 4}}>{emailStatusError}</div>}
          <div className="info-item">
            <label>Member since:</label>
            <span>{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!editing}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editing}
              required
            />
          </div>
          
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </div>
          
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </div>

          {editing ? (
            <div className="button-group">
              <button type="submit">Save Changes</button>
              <button 
                type="button" 
                onClick={() => {
                  setEditing(false);
                  fetchProfile(); // Reset form
                }}
                className="secondary-button"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              type="button" 
              onClick={() => setEditing(true)}
              className="secondary-button"
            >
              Edit Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfilePage; 