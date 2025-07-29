import axios from "axios";
import { supabase } from "./supabase";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

Api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export const getProducts = async () => {
  const response = await Api.get("/api/products");
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await Api.post("/api/products", productData);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await Api.post("/api/orders", orderData);
  return response.data;
};

export const getOrders = async () => {
  const response = await Api.get("/api/orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await Api.get(`/api/orders/${id}`);
  return response.data;
};

export const updateOrder = async (id, orderData) => {
  const response = await Api.put(`/api/orders/${id}`, orderData);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await Api.delete(`/api/orders/${id}`);
  return response.data;
};

export default Api;



























































