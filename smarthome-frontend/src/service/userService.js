import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getUsers = () => axios.get(`${API_BASE_URL}/users`);
export const getUserById = (id) => axios.get(`${API_BASE_URL}/users/${id}`);
export const createUser = (user) => axios.post(`${API_BASE_URL}/users`, user);
export const updateUser = (id, user) => axios.put(`${API_BASE_URL}/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/users/${id}`);
export const loginUser = (user) => axios.post(`${API_BASE_URL}/users/login`,user);