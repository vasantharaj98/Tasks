import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));

const getOrders = async () => {
  const response = await axios.get(API_URL + `api/purchase/oem/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const getPurchasebyDealerID = async (id) => {
  const response = await axios.get(API_URL + `api/purchase/dealer/${id}`, { headers: authHeader() });
  return response.data;
};

const getPurchasebyID = async (p_id) => {
  const response = await axios.get(API_URL + `api/purchase/pid/${p_id}`, { headers: authHeader() });
  return response.data;
};

const updatePurchasebyID = async (p_id, formData) => {
  const response = await axios.put(API_URL + `api/purchase/pid/${p_id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const updatePurchasebySecret = async (p_id, formData) => {
  const response = await axios.put(API_URL + `api/purchase_secret/${p_id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const ordersService = {
  getOrders,
  getPurchasebyDealerID,
  getPurchasebyID,
  updatePurchasebyID,
  updatePurchasebySecret
};

export default ordersService