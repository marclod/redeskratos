import axios from 'axios';

const API = 'http://3.128.200.151/api';

export const register = (email, password) =>
  axios.post(`${API}/register`, { email, password });

export const login = (email, password) =>
  axios.post(`${API}/login`, { email, password });

export const fetchTasks = (token) =>
  axios.get(`${API}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createTask = (title, token) =>
  axios.post(
    `${API}/tasks`,
    { title },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const deleteTask = (id, token) =>
  axios.delete(`${API}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
