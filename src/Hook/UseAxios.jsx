import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;