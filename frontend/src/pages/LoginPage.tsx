import "../css/RegisterAndLogin.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import { FaLock } from "react-icons/fa";
import Logo from "../images/turnike-logo.png"
import { useFormik } from 'formik';
import { schemaLogin } from '../schema/Schema';
import { useNavigate } from "react-router-dom";
import RegisterLoginServices from "../services/RegisterLoginServices";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/appSlice";
import { UserType } from "../types/Types";
import { toast } from "react-toastify";

interface CheckUserType {
    user: UserType;
    message: string
}

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submit = async (values: any, action: any) => {
        try {
            dispatch(setLoading(true))
            const response: CheckUserType = await RegisterLoginServices.login(values.email, values.password);
            if (response) {
                toast.success(response.message)
                dispatch(setCurrentUser(response.user))
                localStorage.setItem("currentUser", JSON.stringify(response.user))
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

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: submit,
        validationSchema: schemaLogin
    });

    const reset = () => {
        resetForm();
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
                        <h2 className='title'>GİRİŞ YAP</h2>
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