import { AxiosResponse } from "axios";
import axiosInstance from "../config/AxiosConfig";
import { EventType } from "../types/Types";

class EventServices {

    getAllEvents(): Promise<EventType[]> {
        return new Promise((resolve: any, reject: any) => {
            axiosInstance.get("/api/events")
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }

    getEventById(eventId: string): Promise<EventType> {
        return new Promise((resolve: any, reject: any) => {
            axiosInstance.get(`/api/events/id/${eventId}`)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }

    async addEvent(payload: EventType): Promise<any> {
        try {
            // Backend'e istek gönder
            const response: AxiosResponse<any> = await axiosInstance.post(`/api/events/addEvent`, payload);

            // Yanıtın başarılı olup olmadığını kontrol et
            if (response.status === 200 || response.status === 201) {
                return {
                    success: true,
                    message: response.data.message || "Etkinlik başarıyla kaydedildi.",
                };
            }

            // Eğer beklenmeyen bir durum varsa
            throw new Error("Beklenmedik bir durum oluştu.");
        } catch (error: any) {
            // Hata detayını logla
            console.error("Backend error: ", error);

            // Kullanıcıya gösterilecek hata mesajını ayarla
            const errorMessage = error.response?.data?.message || "Etkinlik kaydedilemedi. Lütfen tekrar deneyin.";

            // Hata mesajını fırlat
            throw new Error(errorMessage);
        }
    }
}

export default new EventServices