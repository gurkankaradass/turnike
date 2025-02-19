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

export const schemaUpdate = yup.object().shape({
    password: yup.string().min(8, "Şifre en az 8 karakter olmalıdır").required("Şifre Boş Geçilemez"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Şifreler Aynı Değil").required("Şifre Tekrarı Zorunludur")
});