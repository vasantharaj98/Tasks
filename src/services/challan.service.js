import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));

const createNewChallan = async (data) => {
  const response = await axios.post(API_URL + "api/delivery-challan", { ...data, "oem_id":user.oem_id }, { headers: authHeader() });
  console.log(response);
  return response.data;
};

const getChallan = async () => {
  const response = await axios.get(API_URL + `api/delivery-challan/oem/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const updateChallan = async (c_id, formData) => {
  const response = await axios.put(API_URL + `api/delivery-challan/${c_id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const deleteChallan = async (c_id) => {
  const response = await axios.delete(API_URL + `api/delivery-challan/${c_id}`, { headers: authHeader() });
  return response.data;
};

const getChallanbyId = async (c_id) => {
  const response = await axios.get(API_URL + `api/delivery-challan/id/${c_id}`, { headers: authHeader() });
  return response.data;
};

const challanService = {
  createNewChallan,
  getChallan,
  updateChallan,
  deleteChallan,
  getChallanbyId
};

export default challanService