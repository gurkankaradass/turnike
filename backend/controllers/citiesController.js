const { poolPromise } = require('../config/db');

const getAllCities = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT name FROM cities');
        res.json(result.recordset);
    } catch (error) {
        console.error("API Hatası: ", error);
        res.status(500).json({ message: "Sunucu Hatası" });
    }
};

module.exports = {
    getAllCities
};