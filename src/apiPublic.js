import axios from "axios";
import { ACCESS_TOKEN } from "./constents";
import { jwtDecode } from "jwt-decode";
const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export default apiPublic;
