import * as yup from "yup";

export const schemaRegister = yup.object().shape({
    name: yup.string().required("İsim Boş Geçilemez"),
    surname: yup.string().required("Soyisim Boş Geçilemez"),
    email: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Geçerli bir e-posta adresi giriniz").required("Soyisim Boş Geçilemez"),
    phone: yup.string().matches(/^\d{10,15}$/, "Telefon numarası 10 ile 15 karakter arasında olmalıdır").required("Telefon Boş Geçilemez"),
    password: yup.string().min(8, "Şifre en az 8 karakter olmalıdır").required("Şifre Boş Geçilemez"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Şifreler Aynı Değil").required("Şifre Tekrarı Zorunludur"),
    term: yup.boolean().required("Sözleşme Onaylanmalıdır").oneOf([true], "Sözleşme Onaylanmalıdır"),
    // term: yup.boolean().required("Sözleşme Onaylanmalıdır"),
});

export const schemaLogin = yup.object().shape({
    email: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Geçerli bir e-posta adresi giriniz").required("Soyisim Boş Geçilemez"),
    password: yup.string().required("Şifre Boş Geçilemez")
});

export const schemaAdminLogin = yup.object().shape({
    username: yup.string().required("Kullanıcı Adı Boş Geçilemez"),
    password: yup.string().required("Şifre Boş Geçilemez")
});

export const schemaUpdate = yup.object().shape({
    password: yup.string().min(8, "Şifre en az 8 karakter olmalıdır").required("Şifre Boş Geçilemez"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Şifreler Aynı Değil").required("Şifre Tekrarı Zorunludur")
});

export const schemaAddEvent = yup.object().shape({
    name: yup.string().required("İsim Boş Geçilemez"),
    date: yup.string().required("Tarih Boş Geçilemez").matches(/^\d{4}-\d{2}-\d{2}$/, "Tarih YYYY-AA-GG formatında olmalıdır"),
    details: yup.string().required("Detay Boş Geçilemez"),
    image: yup.string().required("Fotoğraf Boş Geçilemez"),
    category: yup.string().required("Kategori Boş Geçilemez"),
    address: yup.string().required("Mekan İsmi Boş Geçilemez"),
    map: yup.string().required("Harita URL Boş Geçilemez"),
    price: yup.string().required("Ücret Boş Geçilemez"),
    city: yup.string().required("Şehir Boş Geçilemez"),
});

export const schemaAddBalance = yup.object().shape({
    cardName: yup.string().required("İsim Boş Geçilemez"),
    cardSurname: yup.string().required("Soyisim Boş Geçilemez"),
    cardNo: yup.string().required("Kart Numarası Boş Geçilemez").matches(/^\d{16}$/, "Kart numarası 16 haneli olmalıdır"),
    cvv: yup.string().required("CVV Boş Geçilemez").matches(/^\d{3}$/, "CVV 3 haneli olmalıdır"),
    newBalance: yup.string().required("Tutar Boş Geçilemez")
});