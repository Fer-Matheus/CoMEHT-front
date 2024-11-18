import axios from "axios";
import {getCookie} from "cookies-next"

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const token = getCookie("Authorization")

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
