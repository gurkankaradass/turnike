import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { setCurrentUser, setDrawer, setLoading } from '../redux/appSlice'
import { toast } from 'react-toastify'
import UserServices from "../services/UserServices";
import { schemaUpdate } from '../schema/Schema'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { setBasket } from '../redux/basketSlice'
import { setTicket } from '../redux/ticketSlice'
import WalletIcon from '@mui/icons-material/Wallet';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


const AccountSettingsPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const reset = () => {
    resetForm();
  }

  const submit = async (values: any, action: any) => {
    try {
      dispatch(setLoading(true));
      if (currentUser?.id) {
        const response = await UserServices.changePassword(currentUser?.id, values.password);
        if (response) {
          toast.success(response.message);
          resetForm();
        }
      }
    } catch (error: any) {
      toast.error(error)
    } finally {
      dispatch(setLoading(false));
    }
  }

  const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: "",
    },
    onSubmit: submit,
    validationSchema: schemaUpdate
  });


  const deleteAccount = async () => {
    try {
      dispatch(setLoading(true));
      if (currentUser?.email) {
        const response = await UserServices.deleteUser(currentUser?.email);
        if (response) {
          toast.success(response.message);
          localStorage.removeItem("currentUser");
          dispatch(setCurrentUser(null))
          dispatch(setDrawer(false))
          dispatch(setBasket([]))
          localStorage.removeItem("basket")
          dispatch(setTicket([]))
          localStorage.removeItem("ticket")
          navigate("/")
        }
      }
    } catch (error: any) {
      toast.error(error)
    } finally {
      dispatch(setLoading(false));
    }
  }



  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <Container>
        <div className='form-div' style={{ marginTop: "150px" }}>
          <form className='form' onSubmit={handleSubmit}>
            <h2 className='title'>HESAP BİLGİLERİ</h2>
            <div className='input-div'>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <TextField
                  id="name"
                  label="İsim"
                  value={currentUser?.name}
                  sx={{ marginBottom: "10px", width: "47%" }}
                  slotProps={{
                    input: {
                      readOnly: true,
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
                  id="surname"
                  label="Soyisim"
                  value={currentUser?.surname}
                  sx={{ marginBottom: "10px", width: "47%" }}
                  slotProps={{
                    input: {
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser />
                        </InputAdornment>
                      ),
                    },
                  }}
                  variant="standard"
                />
              </div>
              <TextField
                id="email"
                label="E-Posta"
                value={currentUser?.email}
                sx={{ marginBottom: "10px", width: "100%" }}
                slotProps={{
                  input: {
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
              />
              <TextField
                id="phone"
                label="Telefon"
                value={currentUser?.phone}
                sx={{ marginBottom: "10px", width: "100%" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
              />
              <TextField
                id="balance"
                label="Bakiye"
                value={`${currentUser?.balance} ₺`}
                sx={{ marginBottom: "10px", width: "100%" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <WalletIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
              />
              <h2 className='title' style={{ margin: "25px 0px" }}>ŞİFRE DEĞİŞTİR</h2>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <TextField
                  id="password"
                  label="Yeni Şifre"
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  sx={{ marginBottom: "10px", width: "47%" }}
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
                  label="Yeni Şifre (Tekrar)"
                  type='password'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  sx={{ marginBottom: "10px", width: "47%" }}
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
            </div>
            <div className='button-div' style={{ marginTop: "20px" }}>
              <button type='submit' className='submit'>Şifreyi Değiştir</button>
              <button onClick={reset} type='reset' className='reset'>Temizle</button>
            </div>
            <div>
              <button onClick={() => setOpen(true)} type='button' className='login-button'>Hesabı Sil</button>
            </div>
            <div>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                  <h3>Hesabı Sil</h3></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Hesabınızı silmek istediğinize emin misiniz?
                  </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ marginBottom: "10px" }}>
                  <button style={{ width: "70px" }} onClick={() => setOpen(false)} className='reset'>İptal</button>
                  <button style={{ width: "70px" }} onClick={deleteAccount} className='submit'>Evet</button>
                </DialogActions>
              </Dialog>
            </div>
          </form>
        </div>
      </Container >
      <Footer />
    </div >
  )
}

export default AccountSettingsPage