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
