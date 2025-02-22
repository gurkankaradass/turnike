import { AxiosResponse } from "axios"
import axiosInstance from "../config/AxiosConfig"
import { CityType } from "../types/Types"

class CityService {

    gettAllCities(): Promise<CityType[]> {
        return new Promise((resolve: any, reject: any) => {
            axiosInstance.get("/api/cities")
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }

}

export default new CityService();