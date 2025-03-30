
import axios from "axios";
import baseURL from "../API/baseURL";

export const usersInstance = axios.create({
  baseURL: `${baseURL}/users`,
  timeout: 5000,
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
});

export const coursesInstance = axios.create({
  baseURL: `${baseURL}/courses`,
  timeout: 5000,
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
});

export const subjectInstance = axios.create({
  baseURL: `${baseURL}/subject`,
  timeout: 5000,
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
});

export const examInstance = axios.create({
  baseURL: `${baseURL}/exam`,
  timeout: 5000,
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
});

export const questionInstance = axios.create({
  baseURL: `${baseURL}/question`,
  timeout: 5000,
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
});
