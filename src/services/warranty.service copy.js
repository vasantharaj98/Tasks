import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));

const getWarranty = async () => {
  const response = await axios.get(API_URL + `api/warranty/oem/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const getWarrantybyId = async (id) => {
  const response = await axios.get(API_URL + `api/warranty/wid/${id}`, { headers: authHeader() });
  return response.data;
};

const updateWarrantybyId = async (w_id, formData) => {
  const response = await axios.put(API_URL + `api/warranty/wid/${w_id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const warrantyService = {
  getWarranty,
  getWarrantybyId,
  updateWarrantybyId
};

export default warrantyService