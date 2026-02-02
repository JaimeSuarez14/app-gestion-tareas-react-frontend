import type { ApiResponseCreate, User, UserLogin } from "../../lib/types/User";
import apiUser from "./api";

const authService = () => ({
   getAll: async() => {
    return await apiUser.get<ApiResponseCreate>("users", {
      withCredentials: true,
    });
  },

  create: async (user: User) => {
    return await apiUser.post<ApiResponseCreate>("register", user, {
      withCredentials: true,
    });
  },

  login: async (userLogin: UserLogin) => {
    return await apiUser.post("login", userLogin, {
      withCredentials: true,
    });
  },

  logout: async () => {
    return await apiUser.post("logout", {
      withCredentials: true,
    });
  },

  update: (user: User) => {
    return apiUser.put(`/users/${user._id}`, user ,{
      withCredentials: true,
    });
  },

  delete: (id: number) => {
    return apiUser.delete(`/users/${id}`, {
      withCredentials: true,
    });
  },
});

export default authService;