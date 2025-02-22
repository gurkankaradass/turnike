import { AxiosResponse } from "axios";
import axiosInstance from "../config/AxiosConfig";
import { UserType } from "../types/Types";

class UserService {

    async register(newUser: UserType): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axiosInstance.post(`/api/users/register`, newUser);
            return {
                success: true,
                message: response.data.message,
            };
        } catch (error: any) {
            throw error.response?.data?.message || "Kullanıcı kaydedilemedi.";
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const response = await axiosInstance.post("/api/users/login", { email, password });
            return {
                message: response.data.message,
                user: response.data.user
            };
        } catch (error: any) {
            throw error.response?.data?.message || "Giriş yapılamadı.";
        }
    }

    async loginAdmin(username: string, password: string): Promise<any> {
        try {
            const response = await axiosInstance.post("/api/users/loginAdmin", { username, password });
            return {
                message: response.data.message,
                admin: response.data.admin
            };
        } catch (error: any) {
            throw error.response?.data?.message || "Giriş yapılamadı.";
        }
    }

    async changePassword(userId: string, newPassword: string): Promise<any> {
        try {
            const response = await axiosInstance.post("/api/users/change-password", { userId, newPassword });
            return {
                message: response.data.message,
                success: true
            };
        } catch (error: any) {
            throw error.response?.data?.message || "Şifre değiştirilemedi.";
        }
    }

    async deleteUser(email: string): Promise<any> {
        try {
            const response = await axiosInstance.delete(`/api/users/${email}`);
            return {
                message: response.data.message,
                success: true
            };
        } catch (error: any) {
            throw error.response?.data?.message || "Kullanıcı silinemedi.";
        }
    }

}


export default new UserService;