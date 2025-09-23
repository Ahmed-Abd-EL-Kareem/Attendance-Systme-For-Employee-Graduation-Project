import axios from "axios";

// Base API configuration
const API_BASE_URL = "https://90-attendance-system-back-end.vercel.app/api/v1";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth headers if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

// API Service Functions
export const apiService = {
  // Employee APIs
  employees: {
    getAll: () => apiClient.get("/employees"),
    getById: (id) => apiClient.get(`/employees/${id}`),
    create: (data) =>
      apiClient.post("/employees", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    update: (id, data) =>
      apiClient.patch(`/employees/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    delete: (id) => apiClient.delete(`/employees/${id}`),
    getCountsByDepartment: () =>
      apiClient.get("/employees/employee-counts-by-department"),
    getCountsByShift: () =>
      apiClient.get("/employees/employee-counts-by-shift"),
  },

  // Department APIs
  departments: {
    getAll: () => apiClient.get("/departments"),
    getById: (id) => apiClient.get(`/departments/${id}`),
    create: (data) => apiClient.post("/departments", data),
    update: (id, data) => apiClient.patch(`/departments/${id}`, data),
    delete: (id) => apiClient.delete(`/departments/${id}`),
  },

  // Shift APIs
  shifts: {
    getAll: () => apiClient.get("/shifts"),
    getById: (id) => apiClient.get(`/shifts/${id}`),
    create: (data) => apiClient.post("/shifts", data),
    update: (id, data) => apiClient.patch(`/shifts/${id}`, data),
    delete: (id) => apiClient.delete(`/shifts/${id}`),
  },

  // Account/User APIs
  accounts: {
    getAll: () => apiClient.get("/accounts"),
    getById: (id) => apiClient.get(`/accounts/${id}`),
    login: (data) => apiClient.post("/accounts/login", data),
    create: (data) => apiClient.post("/accounts/signup", data),
    updatePassword: (id, data) =>
      apiClient.patch(`/accounts/updateEmployeePassword/${id}`, data),
    updateMyPassword: (data) =>
      apiClient.patch("/accounts/updateMyPassword", data),
    delete: (id) => apiClient.delete(`/accounts/${id}`),
  },

  // Report APIs
  reports: {
    getAll: (params = {}) => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      const queryString = queryParams.toString();
      return apiClient.get(`/reports${queryString ? `?${queryString}` : ""}`);
    },
    getByEmployeeId: (employeeId, params = {}) => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      const queryString = queryParams.toString();
      return apiClient.get(
        `/reports/${employeeId}${queryString ? `?${queryString}` : ""}`
      );
    },
  },

  // Attendance APIs
  attendance: {
    timeIn: (data) => apiClient.post("/attendance/time-in", data),
    timeOut: (data) => apiClient.post("/attendance/time-out", data),
    getTodayAttendance: (employeeId) =>
      apiClient.get(`/attendance/today/${employeeId}`),
  },

  // Dashboard APIs
  dashboard: {
    getCounts: () => apiClient.get("/dashboard"),
  },
};

export default apiClient;
