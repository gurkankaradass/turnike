import { AxiosResponse } from "axios";
import axiosInstance from "../config/AxiosConfig";
import { UserType } from "../types/Types";

class RegisterLoginPageService {

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

    update(id: string, balance: number): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            axiosInstance.patch(`/users/${id}`, { balance: balance })
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }
}

export default new RegisterLoginPageService;