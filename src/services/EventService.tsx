import { AxiosResponse } from "axios";
import axiosInstance from "../config/AxiosConfig";
import { EventType } from "../types/Types";

class EventServices {

    getAllEvents(): Promise<EventType[]> {
        return new Promise((resolve: any, reject: any) => {
            axiosInstance.get("/events")
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }
}

export default new EventServices