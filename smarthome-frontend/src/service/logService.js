import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const createDeviceLog = (log) => axios.post(`${API_BASE_URL}/logs`, log);
export const getDeviceLogs = (username) =>
  axios.get(`${API_BASE_URL}/logs/${username}`);
