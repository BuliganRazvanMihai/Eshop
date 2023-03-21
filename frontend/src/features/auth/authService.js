import axios from "axios";
import { reset } from "./authSlice";

const API_URL = "http://127.0.0.1:5000/api/users/";

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "signin", userData);

  if (response.data) {
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  }

  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const forgotPassword = async (resetEmail) => {
  const response = await axios.post(API_URL + "forgotpassword", { resetEmail });

  if (response.data) {
    localStorage.setItem("resetEmail", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("resetInfo");
};

const authService = {
  logout,
  login,
  register,
  forgotPassword,
};

export default authService;
