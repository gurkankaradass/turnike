import "../css/RegisterAndLogin.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Checkbox, FormControlLabel } from '@mui/material';
import Logo from "../images/turnike-logo.png"
import { useFormik } from 'formik';
import { schemaRegister } from '../schema/Schema';
import RegisterLoginPageServices from "../services/RegisterLoginServices";
import { UserType } from "../types/Types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/appSlice";

function RegisterPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (values: any, action: any) => {
        try {
            dispatch(setLoading(true));
            const payload: UserType = {
                id: String(Math.floor(Math.random() * 9999999)),
                username: values.username,
                password: values.password,
                balance: 1000
            }
            const response = await RegisterLoginPageServices.register(payload);
            if (response) {
                toast.success("Kullanıcı Kaydedildi")
                navigate("/login");
            }
        } catch (error) {
            toast.success("Kullanıcı Kaydedilirken Hata Oluştu")
        } finally {
            dispatch(setLoading(false));
        }
    }

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: "",
            term: ""
        },
        onSubmit: submit,
        validationSchema: schemaRegister
    });

    const reset = () => {
        resetForm();
    }
    return (
        <div className='register'>
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
                        <h2 className='title'>HESAP OLUŞTUR</h2>
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
                            <TextField
                                id="confirmPassword"
                                label="Şifre (Tekrar)"
                                type='password'
                                value={values.confirmPassword}
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
                                helperText={errors.confirmPassword && <span className='error-span'>{errors.confirmPassword}</span>}
                            />
                        </div>
                        <div className='check-div'>
                            <div className='check-input'>
                                <FormControlLabel control={<Checkbox id='term' onChange={handleChange} value={values.term} />} label="Kullanıcı Sözleşmesini Kabul Ediyorum" />
                            </div>
                            <div className='check-error'>
                                {errors.term && <span className='error-span'>{errors.term}</span>}
                            </div>
                        </div>
                        <div className='button-div'>
                            <button type='submit' className='submit'>Hesap Oluştur</button>
                            <button onClick={reset} type='reset' className='reset'>Temizle</button>
                        </div>
                        <div>
                            <button onClick={() => navigate("/login")} type='button' className='login-button'>Zaten Bir Hesabım Var</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage