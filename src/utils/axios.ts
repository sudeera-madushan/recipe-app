import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
const Axios = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const cookies = Cookies.get("token"); 
  let token = "";
  if (cookies) {
    token = JSON.parse(cookies)["token"];
    console.log('Cookies:', token);
  }
  // @ts-ignore
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      Cookies.remove("token");
      if (Router.pathname !== "/login") {
        Router.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
