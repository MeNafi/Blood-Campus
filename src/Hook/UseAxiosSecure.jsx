import axios from "axios";
import React, { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

// Create the instance outside the hook
const axiosSecure = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

const UseAxiosSecure = () => {
  const { user, signOutUser } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Request Interceptor: Attach Token
    const reqInterceptor = axiosSecure.interceptors.request.use(function (config) {
      // Firebase tokens are usually under user?.accessToken or user?.stsTokenManager?.accessToken
      const token = user?.accessToken; 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    // 2. Response Interceptor: Handle 401/403 Errors
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const statusCode = error.response?.status;
        
        // 401: Unauthorized, 403: Forbidden (standard for JWT expiration)
        if (statusCode === 401 || statusCode === 403) {
          await signOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutUser, navigate]);

  // CRITICAL: Return the instance so it can be used in components
  return axiosSecure;
};

export default UseAxiosSecure;