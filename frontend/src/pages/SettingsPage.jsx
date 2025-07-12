import { useState } from 'react';
import { changePassword, updateSettings, deleteAccount } from '../services/api';
import Alert from '../components/Alert';

function SettingsPage() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoSave: true,
    defaultAppType: 'cloze_text'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setSuccess('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSettingsChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await updateSettings(settings);
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    setError('');
    setSuccess('');
    
    try {
      await deleteAccount();
      setSuccess('Account deleted successfully!');
      // Очистить токен и перенаправить на главную
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <p style={{fontSize: '1.05rem', color: 'var(--muted)', marginBottom: 24, textAlign: 'center', maxWidth: 340}}>
        Manage your account settings and preferences.
      </p>
      
      {error && <Alert message={error} type="error" />}
      {success && <Alert message={success} type="success" />}

      {/* Password Change */}
      <div className="settings-section">
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button type="submit">Change Password</button>
        </form>
      </div>

      {/* Application Settings */}
      <div className="settings-section">
        <h3>Application Settings</h3>
        <form onSubmit={handleSettingsChange}>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleSettingChange}
              />
              Email Notifications
            </label>
            <small>Receive email notifications about conversion status</small>
          </div>
          
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="autoSave"
                checked={settings.autoSave}
                onChange={handleSettingChange}
              />
              Auto Save
            </label>
            <small>Automatically save conversion progress</small>
          </div>
          
          <div className="form-group">
            <label>Default App Type</label>
            <select
              name="defaultAppType"
              value={settings.defaultAppType}
              onChange={handleSettingChange}
            >
              <option value="cloze_text">Cloze Text</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="matching">Matching</option>
            </select>
          </div>
          
          <button type="submit">Save Settings</button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="settings-section danger-zone">
        <h3>Danger Zone</h3>
        <div className="danger-item">
          <div>
            <h4>Delete Account</h4>
            <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
          </div>
          {!showDeleteConfirm ? (
            <button 
              className="danger-button"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete Account
            </button>
          ) : (
            <div className="delete-confirmation">
              <p style={{color: 'var(--error)', fontSize: '0.9rem', marginBottom: 8}}>
                Are you sure? This action cannot be undone.
              </p>
              <div className="button-group">
                <button 
                  className="danger-button"
                  onClick={handleDeleteAccount}
                >
                  Yes, Delete My Account
                </button>
                <button 
                  className="secondary-button"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage; 