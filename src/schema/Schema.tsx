import * as yup from "yup";

export const schemaRegister = yup.object().shape({
    username: yup.string().required("Kullanıcı Adı Boş Geçilemez"),
    password: yup.string().min(8, "Şifre en az 8 karakter olmalıdır").required("Şifre Boş Geçilemez"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Şifreler Aynı Değil").required("Şifre Tekrarı Zorunludur"),
    term: yup.boolean().required("Sözleşme Onaylanmalıdır").oneOf([true], "Sözleşme Onaylanmalıdır"),
    // term: yup.boolean().required("Sözleşme Onaylanmalıdır"),
});

export const schemaLogin = yup.object().shape({
    username: yup.string().required("Kullanıcı Adı Boş Geçilemez"),
    password: yup.string().required("Şifre Boş Geçilemez")
});