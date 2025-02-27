const { sql, poolPromise } = require('../config/db');

const getAllEvents = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT e.*, c.name AS category , cty.name AS city_name FROM events e JOIN categories c ON e.category_id = c.id JOIN cities cty ON e.city_id = cty.id');
        res.json(result.recordset);
    } catch (error) {
        console.error("API Hatası: ", error);
        res.status(500).json({ message: "Sunucu Hatası" });
    }
};

const getEventById = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Geçersiz ID" });
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query(`
            SELECT e.*, c.name AS category, cty.name AS city 
                FROM events e 
                JOIN categories c ON e.category_id = c.id 
                JOIN cities cty ON e.city_id = cty.id 
                WHERE e.id = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Etkinlik bulunamadı" });
        }

        const event = result.recordset[0];
        event.date = formatDate(event.date);
        res.json(event);
    } catch (error) {
        console.error("API Hatası: ", error);
        res.status(500).json({ message: "Sunucu hatası" });
    }
};

const addEvent = async (req, res) => {
    const { name, date, details, image, sliderImage, category, address, map, price, city } = req.body;

    if (!name || !date || !details || !image || !category || !address || !map || !price || !city) {
        return res.status(400).json({ message: "Gerekli alanlar doldurulmalıdır" });
    }

    try {
        const pool = await poolPromise;

        const userCheckName = await pool.request()
            .input('name', sql.NVarChar, name)
            .query('SELECT id FROM events WHERE name = @name');

        if (userCheckName.recordset.length > 0) {
            return res.status(400).json({ message: "Bu İsim ile Kayıtlı Bir Etkinlik Mevcut" });
        }

        // Price'ı formatla
        let formattedPrice = price;

        // Eğer fiyat tam sayı ise, ",00" ekle
        if (formattedPrice % 1 === 0) {
            formattedPrice = `${formattedPrice}.00`;  // Tam sayı ise ".00" ekle
        }

        // Ondalık formatına yuvarla
        formattedPrice = parseFloat(formattedPrice).toFixed(2);

        const formattedDate = new Date(date).toISOString().split('T')[0];  // YYYY-MM-DD formatında al

        // Etkinlik ekle
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('date', sql.Date, formattedDate)
            .input('details', sql.NVarChar, details)
            .input('image', sql.NVarChar, image)
            .input('sliderImage', sql.NVarChar, sliderImage)
            .input('category', sql.NVarChar, category)
            .input('address', sql.NVarChar, address)
            .input('map', sql.NVarChar, map)
            .input('price', sql.Decimal(10, 2), formattedPrice)
            .input('city', sql.NVarChar, city)
            .query(`
                INSERT INTO events (name, date, details, image, sliderImage, category_id, address, map, price, city_id)
                VALUES (
                    @name, 
                    @date, 
                    @details, 
                    @image, 
                    @sliderImage, 
                    (SELECT id FROM categories WHERE name = @category), 
                    @address, 
                    @map, 
                    @price, 
                    (SELECT id FROM cities WHERE name = @city)
                );
            `);

        res.status(201).json({ message: "Etkinlik başarıyla kaydedildi" });

    } catch (error) {
        console.error("Etkinlik kayıt hatası:", error);
        res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin" });
    }
};

const getEventByCategory = async (req, res) => {
    const category = req.params.category;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('category', sql.NVarChar, category)
            .query('SELECT e.*, c.name AS category , cty.name AS city FROM events e JOIN categories c ON e.category_id = c.id JOIN cities cty ON e.city_id = cty.id WHERE c.name = @category');

        res.json(result.recordset);
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

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await poolPromise;

        // Etkinlik var mı kontrol et
        const eventCheck = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT id FROM events WHERE id = @id');

        if (eventCheck.recordset.length === 0) {
            return res.status(404).json({ message: "Etkinlik bulunamadı." });
        }

        // Etkinliği sil
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM events WHERE id = @id');

        res.status(200).json({ message: "Etkinlik başarıyla silindi." });

    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin." });
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    addEvent,
    getEventByCategory,
    deleteEvent
};
