import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));

const createNewcustomer = async (data) => {
  const response = await axios.post(API_URL + "api/customer", { ...data }, { headers: authHeader() });
  return response.data;
};

const getCustomer = async (id) => {
  const response = await axios.get(API_URL + `api/customer/${id}`, { headers: authHeader() });
  return response.data;
};

const updateCustomer = async (c_id, formData) => {
  const response = await axios.put(API_URL + `api/customer/${c_id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const deleteCustomer = async (c_id) => {
  const response = await axios.delete(API_URL + `api/customer/${c_id}`, { headers: authHeader() });
  return response.data;
};

const createNewInvoice = async (data) => {
  const response = await axios.post(API_URL + "api/invoice", { ...data }, { headers: authHeader() });
  return response.data;
};

const getInvoicebyDealer = async () => {
  const response = await axios.get(API_URL + `api/invoice/dealer/${user.dealer_id}`, { headers: authHeader() });
  return response.data;
};

const getInvoicebyCus = async (id) => {
  const response = await axios.get(API_URL + `api/invoice/customer/${id}`, { headers: authHeader() });
  return response.data;
};

const getInvoicebyOem = async (id) => {
  const response = await axios.get(API_URL + `api/invoice/oem/${user.oem_id}`, { headers: authHeader() });
  return response.data;
};

const getInvoicebyId = async (id) => {
  const response = await axios.get(API_URL + `api/invoice/id/${id}`, { headers: authHeader() });
  return response.data;
};

const updateInvoicebyId = async (inv_id, formData) => {
  const response = await axios.put(API_URL + `api/invoice/${inv_id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const createNewPayment = async (data) => {
  const response = await axios.post(API_URL + "api/payment", { ...data }, { headers: authHeader() });
  return response.data;
};

const getPaymentbyCus = async (id) => {
  const response = await axios.get(API_URL + `api/payment/customer/${id}`, { headers: authHeader() });
  return response.data;
};

const getPaymentbyId = async (id) => {
  const response = await axios.get(API_URL + `api/payment/id/${id}`, { headers: authHeader() });
  return response.data;
};

const updatePaymentbyId = async (pay_id, formData) => {
  const response = await axios.put(API_URL + `api/payment/${pay_id}`, {...formData}, { headers: authHeader() });
  return response.data;
};

const createNewService = async (data) => {
  const response = await axios.post(API_URL + "api/services", { ...data }, { headers: authHeader() });
  return response.data;
};

const getServicebyCus = async (id) => {
  const response = await axios.get(API_URL + `api/services/customer/${id}`, { headers: authHeader() });
  return response.data;
};

const getServicebyId = async (id) => {
  const response = await axios.get(API_URL + `api/services/id/${id}`, { headers: authHeader() });
  return response.data;
};

const updateServicebyId = async (s_id, formData1) => {
  const response = await axios.put(API_URL + `api/services/${s_id}`, {...formData1}, { headers: authHeader() });
  return response.data;
};

const createNewWarranty = async (data) => {
  const response = await axios.post(API_URL + "api/warranty", { ...data }, { headers: authHeader() });
  return response.data;
};

const getWarrantybyDealer = async (id) => {
  const response = await axios.get(API_URL + `api/warranty/dealer/${id}`, { headers: authHeader() });
  return response.data;
};

const getWarrantybyCus = async (id) => {
  const response = await axios.get(API_URL + `api/warranty/customer/${id}`, { headers: authHeader() });
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

const customerService = {
  createNewcustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  createNewInvoice,
  getInvoicebyDealer,
  getInvoicebyOem,
  getInvoicebyCus,
  getInvoicebyId,
  createNewPayment,
  getPaymentbyCus,
  getPaymentbyId,
  updatePaymentbyId,
  updateInvoicebyId,
  createNewService,
  getServicebyCus,
  getServicebyId,
  updateServicebyId,
  createNewWarranty,
  getWarrantybyDealer,
  getWarrantybyCus,
  getWarrantybyId,
  updateWarrantybyId
};

export default customerService