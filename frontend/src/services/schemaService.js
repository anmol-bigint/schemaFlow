import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_URL || "";
const BASE_URL = rawBaseUrl.replace(/\/+$/, "");

const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getAllSchemas = (token) =>
  axios.get(`${BASE_URL}/api/schema`, authHeaders(token));

export const createSchema = (token, payload) =>
  axios.post(`${BASE_URL}/api/schema`, payload, authHeaders(token));

export const updateSchema = (token, id, payload) =>
  axios.put(`${BASE_URL}/api/schema/${id}`, payload, authHeaders(token));

export const deleteSchema = (token, id) =>
  axios.delete(`${BASE_URL}/api/schema/${id}`, authHeaders(token));
