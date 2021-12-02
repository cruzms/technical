import { get, post } from './Request'
const API_URL = process.env.REACT_APP_API_URL;

export const register = async (data) => {
  const response = await post(`${API_URL}/user/register`, data, false);
  return response;
}

export const login = async (data) => {
  const response = await post(`${API_URL}/user/login`, data, false);
  return response;
}

export const getGHAcessToken = async (data) => {
  const response = await post(`${API_URL}/user/github`, data);
  return response;
}

export const addFavorite = async (data) => {
  const response = await post(`${API_URL}/favorites`, data);
  return response;
}

export const getFavorites = async () => {
  const response = await get(`${API_URL}/favorites`);
  return response;
}

