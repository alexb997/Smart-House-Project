import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getRooms = () => axios.get(`${API_BASE_URL}/rooms`);
export const getRoomById = (id) => axios.get(`${API_BASE_URL}/rooms/${id}`);
export const createRoom = (room) => axios.post(`${API_BASE_URL}/rooms`, room);
export const updateRoom = (id, room) => axios.put(`${API_BASE_URL}/rooms/${id}`, room);
export const deleteRoom = (id) => axios.delete(`${API_BASE_URL}/rooms/${id}`);
export const getRoomDevices = (id) => axios.get(`${API_BASE_URL}/rooms/${id}/devices`);
