import React from 'react'
import "../css/RegisterAndLogin.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Button } from '@mui/material';
import Logo from "../images/turnike-logo.png"

function RegisterPage() {
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
                    <img className='logo' src={Logo} width={350} />
                </div>
                <div className='form-div'>
                    <form className='form'>
                        <h2 className='title'>HESAP OLUŞTUR</h2>
                        <div className='input-div'>
                            <TextField
                                id="username"
                                label="Kullanıcı Adı"
                                sx={{ marginBottom: "20px", width: "100%" }}
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
                            />
                            <TextField
                                id="password"
                                label="Şifre"
                                type='password'
                                sx={{ marginBottom: "20px", width: "100%" }}
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
                            />
                        </div>
                        <div className='check-div'>
                            <input style={{ width: "15px", height: "15px", marginRight: "5px" }} type="checkbox" id="term" />
                            <label>Kullanıcı Sözleşmesini Kabul Ediyorum</label>
                        </div>
                        <div className='button-div'>
                            <Button color='success' sx={{ width: "150px", borderRadius: "20px", textTransform: "none" }} variant="contained">Hesap Oluştur</Button>
                            <Button color='secondary' sx={{ width: "120px", borderRadius: "20px", textTransform: "none" }} variant="contained">Temizle</Button>
                        </div>
                        <div>
                            <Button size='large' variant='text' sx={{ textTransform: "none" }}>Zaten Bir Hesabım Var</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage