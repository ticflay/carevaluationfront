import axios from "axios";
import { SERVER_URL } from "./server";

const getSession = () => {
  return {partnerToken: '85bea5dda66f4d8babcdbfacefb6f03b', AuthorizationKey: 'Basic YWM3Njk1ZTgtOWVhMS00ZTg3LWJlZTItMTRiMDEyYmIyNzc3'};
};

const api = axios.create({
  baseURL: SERVER_URL,
  // timeout: 2000,w
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.url?.endsWith("login") || config.url?.endsWith("register")) {
    return config;
  }
  const token = getSession();

  if (token) {
    config.headers.Authorization = `${token.AuthorizationKey}`;
  }

  return config;
});
