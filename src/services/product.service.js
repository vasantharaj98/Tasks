import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));

const createProduct = async (data) => {
  const response = await axios.post(API_URL + "api/vehicle", { ...data, "oem_id": user.oem_id }, { headers: authHeader() });
  console.log(response);
  return response.data;
};

const DeleteVehicle = async (id) => {
  const response = await axios.delete(API_URL + `api/vehicle/${id}`, { headers: authHeader() });
  return response.data;
};

const DeleteVariant = async (id) => {
  const response = await axios.delete(API_URL + `api/variants/vehicle/${id}`, { headers: authHeader() });
  return response.data;
};

const UpdateProductbyid = async (id, formData) => {
  const response = await axios.put(API_URL + `api/vehicle/${id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const createVariant = async (data) => {
  const response = await axios.post(API_URL + "api/variants", { ...data}, { headers: authHeader() });
  console.log(response);
  return response.data;
};

const UpdateVariantbyid = async (id, formData) => {
  const response = await axios.put(API_URL + `api/variants/${id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const DeleteVariantbyid = async (id) => {
  const response = await axios.delete(API_URL + `api/variants/single/${id}`, { headers: authHeader() });
  return response.data;
};

const createSpare = async (data) => {
  const response = await axios.post(API_URL + "api/spares", { ...data, "oem_id": user.oem_id}, { headers: authHeader() });
  console.log(response);
  return response.data;
};

const createAccessory = async (data) => {
  const response = await axios.post(API_URL + "api/accessories", { ...data, "oem_id": user.oem_id}, { headers: authHeader() });
  console.log(response);
  return response.data;
};

const getProduct = async () => {
  const response = await axios.get(API_URL + `api/vehicle/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const getSpares = async () => {
  const response = await axios.get(API_URL + `api/spares/oem/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const UpdateSparesbyid = async (id, formData) => {
  const response = await axios.put(API_URL + `api/spares/id/${id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const getAccessories = async () => {
  const response = await axios.get(API_URL + `api/accessories/oem/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const UpdateAccessbyid = async (id, formData) => {
  const response = await axios.put(API_URL + `api/accessories/id/${id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const productService = {
  createProduct,
  createVariant,
  getProduct,
  createSpare,
  createAccessory,
  getSpares,
  getAccessories,
  UpdateProductbyid,
  UpdateSparesbyid,
  UpdateAccessbyid,
  UpdateVariantbyid,
  DeleteVehicle,
  DeleteVariant,
  DeleteVariantbyid
};

export default productService