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

module.exports = {
    getAllEvents,
    getEventById,
    getEventByCategory
};
