import { AxiosResponse } from "axios"
import axiosInstance from "../config/AxiosConfig"
import { CategoryType, EventType } from "../types/Types"

class CategoryService {

    gettAllCategories(): Promise<CategoryType[]> {
        return new Promise((resolve: any, reject: any) => {
            axiosInstance.get("/api/categories")
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }

    getEventsByCategoryName(categoryName: string): Promise<EventType[]> {
        return new Promise((resolve: any, reject: any) => {
            axiosInstance.get(`/api/events/category/${categoryName}`)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }
}

export default new CategoryService();