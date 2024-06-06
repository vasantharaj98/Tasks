import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));

const createNewdealer = async (data) => {
  const response = await axios.post(API_URL + "api/dealers", { ...data }, { headers: authHeader() });
  console.log(response);
  return response.data;
};

const getDealer = async () => {
  const response = await axios.get(API_URL + `api/dealers/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const getDealerbyid = async (dealer_id) => {
  const response = await axios.get(API_URL + `api/dealers/dealer/${dealer_id}`, { headers: authHeader() });
  return response.data;
};

const updateDealer = async (dealer_id, formData) => {
  const response = await axios.put(API_URL + `api/dealers/${dealer_id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const deleteDealer = async (dealer_id) => {
  const response = await axios.delete(API_URL + `api/dealers/${dealer_id}`, { headers: authHeader() });
  return response.data;
};

const dealerService = {
  createNewdealer,
  getDealer,
  getDealerbyid,
  updateDealer,
  deleteDealer,
};

export default dealerService