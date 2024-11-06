import axios from "axios";


const axiosJWT = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});


// Request Interceptor
axiosJWT.interceptors.request.use(
  async (config) => {
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_URL + '/auth/token');
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
