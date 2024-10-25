import "../css/RegisterAndLogin.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FaUser } from "react-icons/fa";
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
    result: boolean,
    currentUser: UserType | null
}

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkUser = (userList: UserType[], username: string, password: string): CheckUserType => {
        const response: CheckUserType = { result: false, currentUser: null }

        userList.forEach((user: UserType) => {
            if (user.username === username && user.password === password) {
                response.result = true;
                response.currentUser = user;
            }
        })
        return response;
    }

    const submit = async (values: any, action: any) => {
        try {
            dispatch(setLoading(true))
            const response: UserType[] = await RegisterLoginServices.login();
            if (response) {
                const checkUserResponse: CheckUserType = checkUser(response, values.username, values.password);
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    //Kullanıcı adı ve şifre doğru
                    dispatch(setCurrentUser(checkUserResponse.currentUser));
                    localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser))
                    toast.success("Giriş Başarılı")
                    navigate("/")
                } else {
                    //Kullanıcı adı ve şifre yanlış
                    toast.error("Kullanıcı Adı veya Şifre Hatalı")
                }
            }
        } catch (error) {
            toast.error("Giriş Yapılamadı")
        } finally {
            dispatch(setLoading(false))
        }
    }

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
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
                    <img className='logo' src={Logo} width={350} />
                </div>
                <div className='form-div'>
                    <form className='form' onSubmit={handleSubmit}>
                        <h2 className='title'>GİRİŞ YAP</h2>
                        <div className='input-div'>
                            <TextField
                                id="username"
                                label="Kullanıcı Adı"
                                value={values.username}
                                onChange={handleChange}
                                sx={{ marginBottom: "10px", width: "100%" }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaUser />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                variant="standard"
                                helperText={errors.username && <span className='error-span'>{errors.username}</span>}
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