import axios from "axios";
import { CarService } from "./CarService";
import { PositionStaffService } from "./PositionStaffService";
import { StaffService } from "./StaffService";
export const appClient = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

appClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

appClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
      } else if (error.response.status === 403) {
      } else if (error.response.status && error.response.status >= 500) {
      } else if (
        error.response.status &&
        error.response.status === 400 &&
        error.response.data
      ) {
      } else {
      }
    } else {
    }
    return Promise.reject(error);
  }
);

export const URL = "http://localhost:3001";

export const staffController = new StaffService(URL, "staff", appClient);
export const positionStaffController = new PositionStaffService(URL, "position", appClient);
export const carController = new CarService(URL, "car", appClient);


