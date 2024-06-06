import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const register = (oem_id, user_id, password) => {
  return axios.post(API_URL + "api/login", {
    oem_id,
    password,
  });
};

const login = (userCredentials) => {
  return axios
    .post(API_URL + "api/oem/login", {...userCredentials})
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
        window.location.reload();
      }
      return response.data;
    });
};

const userlogin = (userCredentials) => {
  return axios
    .post(API_URL + "api/user_manage/login", {...userCredentials})
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
          window.location.reload();
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.reload();
};

const authService = {
  register,
  login,
  userlogin,
  logout,
};

export default authService;