import axios from "axios";
import { SERVER_URL } from "./server";


const api = axios.create({
  baseURL: SERVER_URL,
  // timeout: 2000,w
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  async (error) => {
    console.log('oi o erro aq', error);

    
    Promise.reject(error);
    throw error;
  }
);

export default api;
