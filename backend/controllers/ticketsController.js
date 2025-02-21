const { sql, poolPromise } = require('../config/db');

const buyTicket = async (req, res) => {
    const { tickets } = req.body;

    if (!tickets || !Array.isArray(tickets) || tickets.length === 0) {
        return res.status(400).json({ message: "Eksik veya hatalı veri gönderildi." });
    }

    const userId = tickets[0].user_id; // Kullanıcı ID'si tüm biletlerde aynı olduğu için ilkinden alıyoruz.

    try {
        const pool = await poolPromise;

        // Kullanıcının mevcut bakiyesini al
        const userResult = await pool
            .request()
            .input("userId", sql.Int, userId)
            .query("SELECT balance FROM users WHERE id = @userId");

        if (userResult.recordset.length === 0) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        let userBalance = userResult.recordset[0].balance;
        const totalCost = tickets.reduce((sum, ticket) => sum + ticket.total_price, 0);

        if (userBalance < totalCost) {
            return res.status(400).json({ message: "Yetersiz bakiye." });
        }

        // **Transaksiyon başlat**
        const transaction = pool.transaction();
        await transaction.begin();

        try {
            // Bakiyeyi güncelle
            const newBalance = userBalance - totalCost;
            await transaction
                .request()
                .input("newBalance", sql.Decimal(10, 2), newBalance)
                .input("userId", sql.Int, userId)
                .query("UPDATE users SET balance = @newBalance WHERE id = @userId");

            // Biletleri ekleme veya güncelleme
            for (const ticket of tickets) {
                const { event_id, quantity, total_price } = ticket;

                // Mevcut bilet var mı kontrol et
                const existingTicket = await transaction
                    .request()
                    .input("userId", sql.Int, userId)
                    .input("eventId", sql.Int, event_id)
                    .query("SELECT quantity, total_price FROM tickets WHERE user_id = @userId AND event_id = @eventId");

                if (existingTicket.recordset.length > 0) {
                    // Eğer bilet varsa, sayıyı ve fiyatı güncelle
                    const newQuantity = existingTicket.recordset[0].quantity + quantity;
                    const newTotalPrice = existingTicket.recordset[0].total_price + total_price;

                    await transaction
                        .request()
                        .input("newQuantity", sql.Int, newQuantity)
                        .input("newTotalPrice", sql.Decimal(10, 2), newTotalPrice)
                        .input("userId", sql.Int, userId)
                        .input("eventId", sql.Int, event_id)
                        .query("UPDATE tickets SET quantity = @newQuantity, total_price = @newTotalPrice WHERE user_id = @userId AND event_id = @eventId");

                } else {
                    // Eğer bilet yoksa yeni kayıt ekle
                    await transaction
                        .request()
                        .input("userId", sql.Int, userId)
                        .input("eventId", sql.Int, event_id)
                        .input("quantity", sql.Int, quantity)
                        .input("totalPrice", sql.Decimal(10, 2), total_price)
                        .query("INSERT INTO tickets (user_id, event_id, quantity, total_price) VALUES (@userId, @eventId, @quantity, @totalPrice)");
                }
            }

            await transaction.commit(); // İşlemi tamamla

            return res.status(200).json({
                success: true,
                message: "Biletler başarıyla satın alındı.",
                new_balance: newBalance
            });

        } catch (err) {
            await transaction.rollback();
            console.error("Transaksiyon hatası:", err);
            return res.status(500).json({ message: "Satın alma işlemi başarısız oldu." });
        }

    } catch (error) {
        console.error("Bilet satın alma hatası:", error);
        return res.status(500).json({ message: "Sunucu hatası. Lütfen tekrar deneyin." });
    }
};

const getUserTickets = async (req, res) => {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId)) {
        return res.status(400).json({ message: "Geçersiz kullanıcı ID" });
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query(`
            SELECT 
                e.image, e.name AS event_name, e.id, e.date, e.address, 
                t.quantity 
            FROM tickets t
            JOIN events e ON t.event_id = e.id
            WHERE t.user_id = @userId
            ORDER BY e.date DESC
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Kullanıcının herhangi bir bileti bulunamadı" });
        }

        const tickets = result.recordset.map(ticket => ({
            ...ticket,
            date: formatDate(ticket.date) // Tarihi uygun formata çevir
        }));

        console.log(tickets)
        res.json(tickets);
    } catch (error) {
        console.error("API Hatası: ", error);
        res.status(500).json({ message: "Sunucu hatası" });
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

module.exports = { buyTicket, getUserTickets };

