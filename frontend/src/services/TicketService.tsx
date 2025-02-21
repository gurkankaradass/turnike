import axiosInstance from "../config/AxiosConfig";
import { EventType } from "../types/Types";

class TicketService {
    async buyTickets(userId: string, basket: EventType[]): Promise<any> {
        try {
            // Sepet verilerini backend formatına dönüştür
            const tickets = basket.map(event => ({
                user_id: userId,
                event_id: event.id,
                quantity: event.count,
                total_price: event.totalPrice,
            }));

            // API isteğini yap
            const response = await axiosInstance.post('/api/tickets/buy', { tickets });

            // Backend'den gelen mesajı kontrol et
            if (response.status === 200) {
                return {
                    success: true,
                    message: response.data.message || "Satın alma işlemi başarılı.",
                    new_balance: response.data.new_balance, // Eğer yeni bakiye varsa, onu da dön
                };
            }

            // Response'un başarılı olup olmadığını kontrol et
            return {
                success: false,
                message: response.data?.message || "Bilet satın alma işlemi başarısız.",
            };

        } catch (error: any) {
            // Hata mesajını detaylı şekilde yakala
            console.error("Bilet satın alma hatası: ", error);
            return {
                success: false,
                message: error?.response?.data?.message || error.message || "Bilet satın alma işlemi başarısız.",
            };
        }
    }
}

export default new TicketService();
