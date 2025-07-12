import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

export async function uploadPDF(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function convertToApps(fileId, options) {
  try {
    const response = await axios.post(`${API_URL}/convert`, {
      fileId,
      options
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getConversionHistory() {
  try {
    const response = await axios.get(`${API_URL}/history`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function registerUser(username, password, role = "USER") {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
      role
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

// User Profile & Dashboard APIs
export async function getUserProfile() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user-profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateUserProfile(profileData) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/user-profile`, profileData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getUserStats() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user-stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getRecentConversions() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user-recent-conversions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function changePassword(currentPassword, newPassword) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/settings/change-password`, {
      currentPassword,
      newPassword
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateSettings(settings) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/user-settings`, settings, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function deleteAccount() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/settings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
