import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import turnike from "../images/turnike-logo.png";
import { useNavigate } from 'react-router-dom';
import { LuPopcorn } from "react-icons/lu";
import { FaMusic } from "react-icons/fa";
import { GiDramaMasks } from "react-icons/gi";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/appSlice';
import { toast } from 'react-toastify';
import { RootState } from '../redux/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.app);

    const logout = () => {
        localStorage.removeItem("currentUser");
        dispatch(setCurrentUser(null))
        navigate("/")
        toast.success("Çıkış Yapıldı");
    }
    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="fixed" color='default'
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", height: "100px" }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        sx={{ justifyContent: "space-between" }}
                    >
                        <Box
                            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="logo"
                                onClick={() => navigate("/")}
                            >
                                <img src={turnike} width={200} height={80} />
                            </IconButton>
                            <MenuItem className='menu-item' sx={{ display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: "25px" }}>
                                <LuPopcorn size={30} />
                                <Typography
                                    sx={{ textAlign: 'center', fontWeight: "", fontSize: "15px", fontFamily: "inherit" }}>
                                    Sinema
                                </Typography>
                            </MenuItem>|
                            <MenuItem className='menu-item' sx={{ display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: "25px" }}>
                                <GiDramaMasks size={30} />
                                <Typography
                                    sx={{ textAlign: 'center', fontWeight: "", fontSize: "15px", fontFamily: "inherit" }}
                                >Tiyatro</Typography>
                            </MenuItem>|
                            <MenuItem className='menu-item' sx={{ display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: "25px" }}>
                                <FaMusic size={30} />
                                <Typography
                                    sx={{ textAlign: 'center', fontWeight: "", fontSize: "15px", fontFamily: "inherit" }}
                                >Konser</Typography>
                            </MenuItem>|
                            <MenuItem className='menu-item' sx={{ display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: "25px" }}>
                                <PiMicrophoneStageFill size={30} />
                                <Typography
                                    sx={{ textAlign: 'center', fontWeight: "", fontSize: "15px", fontFamily: "inherit" }}
                                >Stand Up</Typography>
                            </MenuItem>
                        </Box>
                        <Box>
                            <Paper
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: 30, width: 250, borderRadius: "20px" }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    id='searchInput'
                                    placeholder="Etkinlik Arayınız..."
                                />
                                <SearchIcon
                                    sx={{ marginRight: "5px" }}
                                />
                            </Paper>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <PersonIcon />
                            {
                                currentUser ?
                                    <>
                                        <Badge color='error' sx={{ margin: "0px 10px", cursor: "pointer" }} >
                                            <ShoppingCartIcon sx={{ marginRight: "10px" }} />
                                        </Badge>
                                        <Button onClick={logout} sx={{ fontWeight: "bold", borderRadius: "25px" }} color='inherit'>Çıkış Yap</Button>
                                    </> : <>
                                        <Button onClick={() => navigate("/login")} sx={{ fontWeight: "bold", borderRadius: "25px" }} color='inherit'>Giriş Yap</Button> /
                                        <Button onClick={() => navigate("/register")} sx={{ fontWeight: "bold", borderRadius: "25px" }} color='inherit'>Hesap Oluştur</Button>
                                    </>
                            }
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}

export default Navbar