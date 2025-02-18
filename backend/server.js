const express = require('express');
const cors = require('cors');
const eventsRoutes = require('./routes/events');
const categoriesRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Turnike Backend Çalışıyor! 🚀");
});

// Event ve Category routerlarını kullan
app.use("/api/events", eventsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor...`);
});
