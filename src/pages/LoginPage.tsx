import "../css/RegisterAndLogin.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Logo from "../images/turnike-logo.png"
import { useFormik } from 'formik';
import { schema } from '../schema/Schema';

function LoginPage() {
    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
        validationSchema: schema
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
                    <form className='form'>
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
                            <button type='button' className='register-button'>Hesap Oluştur</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage