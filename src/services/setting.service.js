import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));

const createOperatingstate = async (data) => {
  const response = await axios.post(API_URL + "api/operating-state", { ...data }, { headers: authHeader() });
  return response.data;
};

const getOperatingstate = async () => {
  const response = await axios.get(API_URL + `api/operating-state/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const createRegion = async (data) => {
  const response = await axios.post(API_URL + "api/regions", { ...data, "oem_id": user.oem_id }, { headers: authHeader() });
  return response.data;
};

const getRegion = async () => {
  const response = await axios.get(API_URL + `api/regions/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const createUser = async (data) => {
  const response = await axios.post(API_URL + "api/user_manage", { ...data, "oem_id": user.oem_id }, { headers: authHeader() });
  return response.data;
};

const getUser = async () => {
  const response = await axios.get(API_URL + `api/user_manage/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const updateUser = async (c_id, formData) => {
  const response = await axios.put(API_URL + `api/user_manage/${c_id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const deleteUser = async (c_id) => {
  const response = await axios.delete(API_URL + `api/user_manage/${c_id}`, { headers: authHeader() });
  return response.data;
};


const settingService = {
  createOperatingstate,
  getOperatingstate,
  createRegion,
  getRegion,
  createUser,
  getUser,
  updateUser,
  deleteUser
};

export default settingService