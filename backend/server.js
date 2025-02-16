const express = require('express');
const cors = require('cors');
const { sql, poolPromise } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Turnike Backend Çalışıyor! 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor...`);
});