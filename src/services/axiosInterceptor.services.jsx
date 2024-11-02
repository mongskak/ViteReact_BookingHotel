import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useEffect } from "react";

const axiosJWT = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});


// Request Interceptor
axiosJWT.interceptors.request.use(
  async (config) => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/auth/token");
      const token = response.data.accessToken;
      config.headers["Authorization"] = `Bearer ${token}`;

    } catch (error) {
      console.log("Error fetching token:", error);
      window.location.href = "/login";

    }
    return config;
  },
  (error) => Promise.reject(error)
);


export { axiosJWT };
