import axios from "axios";
import { API } from "../constants";
import firebase from "firebase";

const apiClient = axios.create({
  baseURL: API.API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await firebase.auth().currentUser.getIdTokenResult();
  config.headers["Authorization"] = `Bearer ${token.token}`;

  return config;
});

export default apiClient;
