import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getDevices = () => axios.get(`${API_BASE_URL}/devices`);
export const updateDeviceSettings = (deviceId, settings) =>
  axios.put(`${API_BASE_URL}/devices/${deviceId}`, settings);
export const controlDevice = (deviceId, action) =>
  axios.post(`${API_BASE_URL}/devices/${deviceId}/${action}`);
export const getDeviceLogs = () => axios.get(`${API_BASE_URL}/logs`);
export const createDevice = (deviceData) =>
  axios.post(`${API_BASE_URL}/devices`, deviceData);
export const removeDevice = (deviceId) =>
  axios.delete(`${API_BASE_URL}/devices/${deviceId}`);
export const assignDeviceToRoom = (deviceId, roomId) =>
  axios.post(`${API_BASE_URL}/devices/${deviceId}/assign-room/${roomId}`);
export const updateDeviceTemperature = (deviceId, temperature) =>
  axios.put(`${API_BASE_URL}/devices/${deviceId}`, { temperature });