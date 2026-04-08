const API_URL = import.meta.env.VITE_API_URL || '';

const resolveResponse = async (response) => {
  const content = await response.json().catch(() => null);
  if (!response.ok) {
    const message = content?.message || content?.error || response.statusText || 'An error occurred';
    throw new Error(message);
  }
  return content;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  return resolveResponse(response);
};

export const registerUser = async (email, password, fullName, role) => {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, fullName, role })
  });
  return resolveResponse(response);
};

export const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return resolveResponse(response);
};

export const fetchResources = async () => {
  const response = await fetch(`${API_URL}/api/resources`);
  return resolveResponse(response);
};

export const fetchExperts = async () => {
  const response = await fetch(`${API_URL}/api/experts`);
  return resolveResponse(response);
};

export const fetchCommunity = async () => {
  const response = await fetch(`${API_URL}/api/community`);
  return resolveResponse(response);
};

export const postCommunity = async (token, title, category, content) => {
  const response = await fetch(`${API_URL}/api/community`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, category, content })
  });
  return resolveResponse(response);
};

export const updateProfileApi = async (token, fullName, bio, location) => {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ fullName, bio, location })
  });
  return resolveResponse(response);
};

// NEW ENDPOINTS

export const fetchCrops = async (token) => {
  const response = await fetch(`${API_URL}/api/crops`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return resolveResponse(response);
};

export const addCrop = async (token, name, progress, stage, watering, health) => {
  const response = await fetch(`${API_URL}/api/crops`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, progress, stage, watering, health })
  });
  return resolveResponse(response);
};

export const fetchTasks = async (token) => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return resolveResponse(response);
};

export const addTask = async (token, title, isCompleted) => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title, isCompleted })
  });
  return resolveResponse(response);
};

export const toggleTask = async (token, id) => {
  const response = await fetch(`${API_URL}/api/tasks/${id}/toggle`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });
  return resolveResponse(response);
};

export const fetchAlerts = async (token) => {
  const response = await fetch(`${API_URL}/api/alerts`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return resolveResponse(response);
};

export const fetchFavorites = async (token) => {
  const response = await fetch(`${API_URL}/api/favorites`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return resolveResponse(response);
};

export const toggleFavoriteResource = async (token, resourceId) => {
  const response = await fetch(`${API_URL}/api/favorites/${resourceId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  return resolveResponse(response);
};
