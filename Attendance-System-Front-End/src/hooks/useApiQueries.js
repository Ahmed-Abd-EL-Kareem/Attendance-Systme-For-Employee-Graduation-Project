import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../services/api";
import { toast } from "react-toastify";

// Query Keys - Centralized for consistency
export const queryKeys = {
  employees: ["employees"],
  employee: (id) => ["employees", id],
  departments: ["departments"],
  department: (id) => ["departments", id],
  shifts: ["shifts"],
  shift: (id) => ["shifts", id],
  accounts: ["accounts"],
  account: (id) => ["accounts", id],
  reports: (params) => ["reports", params],
  employeeCountsByDepartment: ["employees", "counts", "department"],
  employeeCountsByShift: ["employees", "counts", "shift"],
  dashboard: ["dashboard"],
};

// Employee Hooks
export const useEmployees = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.employees,
    queryFn: () => apiService.employees.getAll(),
    select: (data) => data.data.data.employees,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useEmployee = (id) => {
  return useQuery({
    queryKey: queryKeys.employee(id),
    queryFn: () => apiService.employees.getById(id),
    select: (data) => data.data.data.employee,
    enabled: !!id,
  });
};

export const useEmployeeCountsByDepartment = () => {
  return useQuery({
    queryKey: queryKeys.employeeCountsByDepartment,
    queryFn: () => apiService.employees.getCountsByDepartment(),
    select: (data) => data.data.data.counts,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useEmployeeCountsByShift = () => {
  return useQuery({
    queryKey: queryKeys.employeeCountsByShift,
    queryFn: () => apiService.employees.getCountsByShift(),
    select: (data) => data.data.data.counts,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Department Hooks
export const useDepartments = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.departments,
    queryFn: () => apiService.departments.getAll(),
    select: (data) => data.data.data.departments,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useDepartment = (id) => {
  return useQuery({
    queryKey: queryKeys.department(id),
    queryFn: () => apiService.departments.getById(id),
    select: (data) => data.data.data.department,
    enabled: !!id,
  });
};

// Shift Hooks
export const useShifts = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.shifts,
    queryFn: () => apiService.shifts.getAll(),
    select: (data) => data.data.data.shifts,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useShift = (id) => {
  return useQuery({
    queryKey: queryKeys.shift(id),
    queryFn: () => apiService.shifts.getById(id),
    select: (data) => data.data.data.shift,
    enabled: !!id,
  });
};

// Account Hooks
export const useAccounts = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.accounts,
    queryFn: () => apiService.accounts.getAll(),
    select: (data) => data.data.data.accounts,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useAccount = (id) => {
  return useQuery({
    queryKey: queryKeys.account(id),
    queryFn: () => apiService.accounts.getById(id),
    select: (data) => data.data.data.account,
    enabled: !!id,
  });
};

// Report Hooks
export const useReports = (params = {}, options = {}) => {
  return useQuery({
    queryKey: queryKeys.reports(params),
    queryFn: () => apiService.reports.getAll(params),
    select: (data) => data.data.data.reports,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useEmployeeReports = (employeeId, params = {}) => {
  return useQuery({
    queryKey: ["reports", "employee", employeeId, params],
    queryFn: () => apiService.reports.getByEmployeeId(employeeId, params),
    select: (data) => data.data.data.reports,
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
  });
};

// Mutation Hooks
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.employees.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.employees });
      queryClient.invalidateQueries({
        queryKey: queryKeys.employeeCountsByDepartment,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.employeeCountsByShift,
      });
      toast.success("Employee created successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create employee",
        { theme: "colored" }
      );
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiService.employees.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.employees });
      queryClient.invalidateQueries({ queryKey: queryKeys.employee(id) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.employeeCountsByDepartment,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.employeeCountsByShift,
      });
      toast.success("Employee updated successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update employee",
        { theme: "colored" }
      );
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiService.employees.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.employees });
      queryClient.invalidateQueries({
        queryKey: queryKeys.employeeCountsByDepartment,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.employeeCountsByShift,
      });
      toast.success("Employee deleted successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete employee",
        { theme: "colored" }
      );
    },
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.departments.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.departments });
      toast.success("Department created successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create department",
        { theme: "colored" }
      );
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiService.departments.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.departments });
      queryClient.invalidateQueries({ queryKey: queryKeys.department(id) });
      toast.success("Department updated successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update department",
        { theme: "colored" }
      );
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiService.departments.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.departments });
      toast.success("Department deleted successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete department",
        { theme: "colored" }
      );
    },
  });
};

export const useCreateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.shifts.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shifts });
      toast.success("Shift created successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create shift", {
        theme: "colored",
      });
    },
  });
};

export const useUpdateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiService.shifts.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shifts });
      queryClient.invalidateQueries({ queryKey: queryKeys.shift(id) });
      toast.success("Shift updated successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update shift", {
        theme: "colored",
      });
    },
  });
};

export const useDeleteShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiService.shifts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shifts });
      toast.success("Shift deleted successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete shift", {
        theme: "colored",
      });
    },
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.accounts.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts });
      toast.success("Account created successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create account", {
        theme: "colored",
      });
    },
  });
};

export const useUpdateAccountPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiService.accounts.updatePassword(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts });
      toast.success("Password updated successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update password",
        { theme: "colored" }
      );
    },
  });
};

export const useUpdateMyPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.accounts.updateMyPassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts });
      toast.success("Password updated successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update password",
        { theme: "colored" }
      );
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiService.accounts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts });
      toast.success("Account deleted successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete account", {
        theme: "colored",
      });
    },
  });
};

// Login Hook
export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => apiService.accounts.login(data),
    onSuccess: (response) => {
      // Store user information in localStorage
      localStorage.setItem(
        "employeeId",
        JSON.stringify(response.data.data.account.employee._id)
      );
      localStorage.setItem(
        "Role",
        JSON.stringify(response.data.data.account.role)
      );

      localStorage.setItem(
        "loginToast",
        JSON.stringify({
          message: "Login Successful",
          type: "success",
        })
      );
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed", {
        theme: "colored",
      });
    },
  });
};

// Dashboard Hooks
export const useDashboardCounts = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => apiService.dashboard.getCounts(),
    select: (data) => data.data.data,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// Attendance Hooks
export const useTodayAttendance = (employeeId) => {
  return useQuery({
    queryKey: ["attendance", "today", employeeId],
    queryFn: () => apiService.attendance.getTodayAttendance(employeeId),
    select: (data) => data.data.data.attendance,
    enabled: !!employeeId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useTimeIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.attendance.timeIn(data),
    onSuccess: (_, variables) => {
      const employeeId = JSON.parse(localStorage.getItem("employeeId"));
      queryClient.invalidateQueries({
        queryKey: ["attendance", "today", employeeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reports", "employee", employeeId],
      });
      toast.success("Time in recorded successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to record time in", {
        theme: "colored",
      });
    },
  });
};

export const useTimeOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.attendance.timeOut(data),
    onSuccess: (_, variables) => {
      const employeeId = JSON.parse(localStorage.getItem("employeeId"));
      queryClient.invalidateQueries({
        queryKey: ["attendance", "today", employeeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reports", "employee", employeeId],
      });
      toast.success("Time out recorded successfully!", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to record time out",
        { theme: "colored" }
      );
    },
  });
};
