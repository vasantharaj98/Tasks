import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));

const getOEMbyid = async (oem_id) => {
  const response = await axios.get(API_URL + `api/oem/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const updateOEM = async (oem_id, formData) => {
  const response = await axios.put(API_URL + `api/oem/${oem_id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const oemService = {
  getOEMbyid,
  updateOEM,
};

export default oemService