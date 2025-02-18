const { sql, poolPromise } = require('../config/db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, surname, email, phone, password } = req.body;

    if (!name || !surname || !email || !phone || !password) {
        return res.status(400).json({ message: "Tüm alanlar zorunludur" });
    }

    try {
        const pool = await poolPromise;

        const userCheckEmail = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT id FROM users WHERE email = @email');

        if (userCheckEmail.recordset.length > 0) {
            return res.status(400).json({ message: "Bu E-Posta ile Kayıtlı Bir Kullanıcı Mevcut" });
        }

        const userCheckPhone = await pool.request()
            .input('phone', sql.NVarChar, phone)
            .query('SELECT id FROM users WHERE phone = @phone');

        if (userCheckPhone.recordset.length > 0) {
            return res.status(400).json({ message: "Bu Telefon Numarası ile Kayıtlı Bir Kullanıcı Mevcut" });
        }

        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);

        // Kullanıcıyı ekle
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('surname', sql.NVarChar, surname)
            .input('email', sql.NVarChar, email)
            .input('phone', sql.NVarChar, phone)
            .input('password', sql.NVarChar, hashedPassword)
            .query('INSERT INTO users (name, surname, email, phone, password) VALUES (@name, @surname, @email, @phone, @password)');

        res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi" });

    } catch (error) {
        console.error("Kullanıcı kayıt hatası:", error);
        res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Veritabanından kullanıcıyı e-posta ile bulma
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM users WHERE email = @email');

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: "E-posta  Hatalı." });
        }

        const user = result.recordset[0];  // Kullanıcıyı al

        // Şifreyi kontrol et
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Şifre Hatalı." });
        }

        return res.json({
            message: "Giriş başarılı!",
            user: {
                name: user.name,
                surname: user.surname,
                email: user.email,
                phone: user.phone,
                password: user.password,
                balance: user.balance
            }
        });

    } catch (error) {
        console.error("API Hatası: ", error);
        return res.status(500).json({ message: "Sunucu hatası, lütfen daha sonra tekrar deneyin" });
    }
};

module.exports = { registerUser, loginUser };
