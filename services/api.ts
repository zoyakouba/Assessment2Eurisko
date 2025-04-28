import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { User } from '../types/User';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions

export const getUsers = async (search = ''): Promise<User[]> => {
  const res = await api.get(`/users?search=${search}`);
  return res.data.data.users;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data.data.user;
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const res = await api.post('/users', user);
  
  // Log the full response for debugging
  console.log('API response:', res);

  // Correct response structure check
  if (res && res.data) {
    return res.data;  // Assuming response data contains the user object directly
  } else {
    throw new Error('Failed to create user. Invalid response structure.');
  }
};



export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const res = await api.put(`/users/${id}`, user);
  return res.data.data.user;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
