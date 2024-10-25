import { AxiosResponse } from "axios";
import axiosInstance from "../config/AxiosConfig";
import { UserType } from "../types/Types";

class RegisterPageService {
    register(newUser: UserType): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            axiosInstance.post(`/users`, newUser)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }
}

export default new RegisterPageService;