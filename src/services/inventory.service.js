import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));

const createProductStock = async (data) => {
  const response = await axios.post(API_URL + "api/stock-vehicle", { ...data, "oem_id": user.oem_id }, { headers: authHeader() });
  return response.data;
};

const createSpareStock = async (data) => {
  const response = await axios.post(API_URL + "api/stock-spare", { ...data, "oem_id": user.oem_id }, { headers: authHeader() });
  return response.data;
};

const createAccessoryStock = async (data) => {
  const response = await axios.post(API_URL + "api/stock-accessory", { ...data, "oem_id": user.oem_id }, { headers: authHeader() });
  return response.data;
};

const getProductStock = async () => {
  const response = await axios.get(API_URL + `api/dealer_vehicle_inventory`, { headers: authHeader() });
  return response.data;
};

const getSpareStock = async () => {
  const response = await axios.get(API_URL + `api/stock-spare/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const getAccessoriesStock = async () => {
  const response = await axios.get(API_URL + `api/stock-accessory/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const inventoryService = {
  createProductStock,
  createSpareStock,
  createAccessoryStock,
  getProductStock,
  getSpareStock,
  getAccessoriesStock
};

export default inventoryService