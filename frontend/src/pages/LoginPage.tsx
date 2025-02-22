import "../css/RegisterAndLogin.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import { FaLock } from "react-icons/fa";
import Logo from "../images/turnike-logo.png"
import { useFormik } from 'formik';
import { schemaAdminLogin, schemaLogin } from '../schema/Schema';
import { useNavigate } from "react-router-dom";
import UserServices from "../services/UserServices";
import { useDispatch } from "react-redux";
import { setAdmin, setCurrentUser, setLoading } from "../redux/appSlice";
import { AdminType, UserType } from "../types/Types";
import { toast } from "react-toastify";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface CheckUserType {
    user: UserType;
    message: string
}
interface CheckAdminType {
    admin: AdminType;
    message: string
}

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const submit = async (values: any, action: any) => {
        try {
            dispatch(setLoading(true))
            const response: CheckUserType = await UserServices.login(values.email, values.password);
            if (response) {
                toast.success(response.message)
                dispatch(setCurrentUser(response.user))
                localStorage.setItem("currentUser", JSON.stringify(response.user))
                navigate("/")
            }
            else {
                toast.error("E-Posta veya Şifre Hatalı")
            }
        } catch (error: any) {
            toast.error(error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    const submit1 = async (values1: any, action: any) => {
        try {
            dispatch(setLoading(true))
            const response: CheckAdminType = await UserServices.loginAdmin(values1.username, values1.password);
            if (response) {
                toast.success(response.message)
                dispatch(setAdmin(response.admin))
                localStorage.setItem("admin", JSON.stringify(response.admin))
                navigate("/")
            }
            else {
                toast.error("Kullanıcı Adı veya Şifre Hatalı")
            }
        } catch (error: any) {
            toast.error(error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: submit,
        validationSchema: schemaLogin
    });
    const { values: values, handleSubmit: handleSubmit, handleChange: handleChange, errors: errors, resetForm: resetForm } = formik;

    const formik1 = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: submit1,
        validationSchema: schemaAdminLogin
    });
    const { values: values1, handleSubmit: handleSubmit1, handleChange: handleChange1, errors: errors1, resetForm: resetForm1 } = formik1;

    const reset = () => {
        resetForm();
        resetForm1();
    }
    return (
        <div className='login'>
            <div className='left-page'>
                <div className='info-div'>
                    <h3 className='info-title'>Tüm Etkinlikler, Tek Adreste!</h3>
                    <p>Eğlenceye vakit ayırmak için daha fazla bekleme, etkinlik dünyasında seni nelerin beklediğini keşfet!</p>
                </div>
            </div>
            <div className='right-page'>
                <div className='logo-div'>
                    <img onClick={() => navigate("/")} className='logo' src={Logo} width={350} />
                </div>
                <div className='form-div'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "90%" }}>
                            <div style={{ width: "80%" }}>
                                <h2 className='title' style={{ justifyContent: "center", paddingLeft: "10%" }}>GİRİŞ YAP</h2>
                            </div>
                            <div style={{ width: "10%" }}>
                                <button type='button' className='admin-button' onClick={() => setOpen(true)}><AdminPanelSettingsIcon /></button>
                                <div>
                                    <Dialog open={open} onClose={() => setOpen(false)}>
                                        <form onSubmit={handleSubmit1}>
                                            <DialogTitle sx={{ justifyContent: "center" }}>
                                                <h3>ADMİN GİRİŞİ</h3></DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    <div className='input-div'>
                                                        <TextField
                                                            id="username"
                                                            label="Kullanıcı Adı"
                                                            value={values1.username}
                                                            onChange={handleChange1}
                                                            sx={{ marginBottom: "10px", width: "100%" }}
                                                            slotProps={{
                                                                input: {
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <EmailIcon />
                                                                        </InputAdornment>
                                                                    ),
                                                                },
                                                            }}
                                                            variant="standard"
                                                            helperText={errors1.username && <span className='error-span'>{errors1.username}</span>}
                                                        />
                                                        <TextField
                                                            id="password"
                                                            label="Şifre"
                                                            type='password'
                                                            value={values1.password}
                                                            onChange={handleChange1}
                                                            sx={{ marginBottom: "10px", width: "100%" }}
                                                            slotProps={{
                                                                input: {
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <FaLock />
                                                                        </InputAdornment>
                                                                    ),
                                                                },
                                                            }}
                                                            variant="standard"
                                                            helperText={errors1.password && <span className='error-span'>{errors1.password}</span>}
                                                        />
                                                    </div>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions sx={{ justifyContent: "center", marginBottom: "10px" }}>
                                                <button type='submit' className='submit'>Giriş Yap</button>
                                                <button onClick={reset} type='reset' className='reset'>Temizle</button>
                                            </DialogActions>
                                        </form>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                        <div className='input-div'>
                            <TextField
                                id="email"
                                label="E-Posta"
                                value={values.email}
                                onChange={handleChange}
                                sx={{ marginBottom: "10px", width: "100%" }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                variant="standard"
                                helperText={errors.email && <span className='error-span'>{errors.email}</span>}
                            />
                            <TextField
                                id="password"
                                label="Şifre"
                                type='password'
                                value={values.password}
                                onChange={handleChange}
                                sx={{ marginBottom: "10px", width: "100%" }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaLock />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                variant="standard"
                                helperText={errors.password && <span className='error-span'>{errors.password}</span>}
                            />
                        </div>
                        <div className='button-div'>
                            <button type='submit' className='submit'>Giriş Yap</button>
                            <button onClick={reset} type='reset' className='reset'>Temizle</button>
                        </div>
                        <div>
                            <button onClick={() => navigate("/register")} type='button' className='register-button'>Hesap Oluştur</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage