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
import { schemaAddBalance, schemaUpdate } from '../schema/Schema'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { setBasket } from '../redux/basketSlice'
import { setTicket } from '../redux/ticketSlice'
import WalletIcon from '@mui/icons-material/Wallet';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const AccountSettingsPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [month, setMonth] = useState('');

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

  const [year, setYear] = useState('');

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  const reset = () => {
    resetForm();
  }

  const reset1 = () => {
    resetForm1();
    setMonth("");
    setYear("");
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

  const submit1 = async (values1: any, action: any) => {
    try {
      dispatch(setLoading(true));
      if (currentUser?.id) {
        const response = await UserServices.updateBalance(currentUser?.id, values1.newBalance);
        if (response) {
          toast.success(response.message);
          resetForm1();
          const updatedUser = { ...currentUser, balance: response.updatedBalance };
          localStorage.setItem("currentUser", JSON.stringify(updatedUser)); // Local storage güncelleme
          dispatch(setCurrentUser(updatedUser))
        }
      }
    } catch (error: any) {
      toast.error(error)
    } finally {
      dispatch(setLoading(false));
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: "",
    },
    onSubmit: submit,
    validationSchema: schemaUpdate
  });
  const { values: values, handleSubmit: handleSubmit, handleChange: handleChange, errors: errors, resetForm: resetForm } = formik;

  const formik1 = useFormik({
    initialValues: {
      cardName: '',
      cardSurname: '',
      cardNo: "",
      cvv: "",
      month: month,
      year: year,
      newBalance: ""
    },
    onSubmit: submit1,
    validationSchema: schemaAddBalance
  });
  const { values: values1, handleSubmit: handleSubmit1, handleChange: handleChange1, errors: errors1, resetForm: resetForm1 } = formik1;

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
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div className='form-div' style={{ marginTop: "100px", marginBottom: "50px", marginRight: "-200px" }}>
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
          <div className='form-div' style={{ marginTop: "100px", marginBottom: "50px" }}>
            <form className='form' onSubmit={handleSubmit1}>
              <h2 className='title'>BAKİYE YÜKLE</h2>
              <div className='input-div'>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <TextField
                    id="cardName"
                    label="İsim"
                    value={values1.cardName}
                    onChange={handleChange1}
                    sx={{ marginBottom: "10px", width: "47%" }}
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
                    helperText={errors1.cardName && <span className='error-span'>{errors1.cardName}</span>}
                  />
                  <TextField
                    id="cardSurname"
                    label="Soyisim"
                    value={values1.cardSurname}
                    onChange={handleChange1}
                    sx={{ marginBottom: "10px", width: "47%" }}
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
                    helperText={errors1.cardSurname && <span className='error-span'>{errors1.cardSurname}</span>}
                  />
                </div>
                <TextField
                  id="cardNo"
                  label="Kart Numarası"
                  value={values1.cardNo}
                  onChange={handleChange1}
                  type="number"
                  sx={{ marginBottom: "10px", width: "100%" }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCardIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                  variant="standard"
                  helperText={errors1.cardNo && <span className='error-span'>{errors1.cardNo}</span>}
                />
                <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", marginBottom: "10px" }}>
                  <TextField
                    id="cvv"
                    label="CVV"
                    value={values1.cvv}
                    type="number"
                    sx={{ width: "35%" }}
                    onChange={handleChange1}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyIcon />
                          </InputAdornment>
                        ),
                      }
                    }}
                    variant="standard"
                    helperText={errors1.cvv && <span className='error-span'>{errors1.cvv}</span>}
                  />
                  <FormControl size='small' style={{ width: "25%", marginTop: "5px" }}>
                    <InputLabel id="month">Ay</InputLabel>
                    <Select
                      labelId="month"
                      id="month-select"
                      value={month}
                      label="Age"
                      onChange={handleChangeMonth}
                    >
                      <MenuItem value={1}>01</MenuItem>
                      <MenuItem value={2}>02</MenuItem>
                      <MenuItem value={3}>03</MenuItem>
                      <MenuItem value={4}>04</MenuItem>
                      <MenuItem value={5}>05</MenuItem>
                      <MenuItem value={6}>06</MenuItem>
                      <MenuItem value={7}>07</MenuItem>
                      <MenuItem value={8}>08</MenuItem>
                      <MenuItem value={9}>09</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={11}>11</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size='small' style={{ width: "30%", marginTop: "5px" }}>
                    <InputLabel id="year">Yıl</InputLabel>
                    <Select
                      labelId="year"
                      id="year-select"
                      value={year}
                      label="Age"
                      onChange={handleChangeYear}
                    >
                      <MenuItem value={2025}>2025</MenuItem>
                      <MenuItem value={2026}>2026</MenuItem>
                      <MenuItem value={2027}>2027</MenuItem>
                      <MenuItem value={2028}>2028</MenuItem>
                      <MenuItem value={2029}>2029</MenuItem>
                      <MenuItem value={2030}>2030</MenuItem>
                      <MenuItem value={2031}>2031</MenuItem>
                      <MenuItem value={2032}>2032</MenuItem>
                      <MenuItem value={2033}>2033</MenuItem>
                      <MenuItem value={2034}>2034</MenuItem>

                    </Select>
                  </FormControl>
                </div>
                <TextField
                  id="newBalance"
                  label="Yüklenecek Tutar"
                  value={values1.newBalance}
                  type="number"
                  onChange={handleChange1}
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
                  helperText={errors1.newBalance && <span className='error-span'>{errors1.newBalance}</span>}
                />
              </div>
              <div className='button-div' style={{ marginTop: "20px" }}>
                <button type='submit' className='submit'>Bakiye Yükle</button>
                <button onClick={reset1} type='reset' className='reset'>Temizle</button>
              </div>
            </form>
          </div>

        </div>
      </Container >
      <Footer />
    </div >
  )
}

export default AccountSettingsPage