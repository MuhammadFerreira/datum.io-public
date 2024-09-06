import axios from "axios";
import Cookies from 'js-cookie';


const API_URL = process.env.REACT_APP_API_BASE_URL+`/api`;

const login = () => {

  const params = new URLSearchParams();

  params.append('userName', "testuser@datum.io");
  params.append('password', "test");

  return axios
    .post(API_URL + "/login", params)
    .then((response) => {
      if (response.data.access_token) {
        Cookies.set("user", JSON.stringify(response.data), { expires: (1 / 1440) * 15 });
      }

      return response.data;
    });
};

const refreshToken = () => {
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header =
    {
      headers: { "Authorization": "Bearer " + user.refresh_token }
    };
  }

  return axios
    .get(API_URL + "/auth/token/refresh", header).then((response) => {
      if (response.data.access_token) {
        Cookies.set("user", JSON.stringify(response.data), { expires: (1 / 1440) * 15 });
      }
      return response.data;
    });
};

const getUserInfo = async () => {

  refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header =
    {
      headers: { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/user/auth/userinfo", header)).data;
};



const logout = () => {
  Cookies.remove("user");
};

const getCurrentUser = () => {
  try {
    return JSON.parse(Cookies.get("user"));
  }
  catch {
    return null;
  }
};

const authService = {
  login,
  logout,
  getCurrentUser,
  refreshToken,
  getUserInfo,
};



export default authService;