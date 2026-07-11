import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8800/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

//  GET all services
export const getAllServices = async () => {
  const { data } = await api.get("/services");
  return data;
};

// GET single service
export const getServiceById = async (id) => {
  const { data } = await api.get(`/services/${id}`);
  return data;
};

// CREATE service
export const createService = async (payload) => {
  const { data } = await api.post("/services", payload);
  return data;
};

// UPDATE service
export const updateService = async (id, payload) => {
  const { data } = await api.put(`/services/${id}`, payload);
  return data;
};

// DELETE service
export const deleteService = async (id) => {
  const { data } = await api.delete(`/services/${id}`);
  return data;
};

export default api;