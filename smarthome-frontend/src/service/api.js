import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDevices = async () => {
  const response = await api.get('/devices');
  return response.data;
};

export const controlDevice = async (deviceId, action) => {
  const response = await api.post(`/devices/${deviceId}/control`, action);
  return response.data;
};

export const getDeviceLogs = async () => {
  const response = await api.get('/logs');
  return response.data;
};

