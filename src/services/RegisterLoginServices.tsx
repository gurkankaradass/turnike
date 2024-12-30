import { AxiosResponse } from "axios";
import axiosInstance from "../config/AxiosConfig";
import { UserType } from "../types/Types";

class RegisterLoginPageService {
    register(newUser: UserType): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            axiosInstance.post(`/users`, newUser)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }

    login(): Promise<UserType[]> {
        return new Promise((resolve: any, reject: any) => {
            axiosInstance.get("/users")
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        })
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