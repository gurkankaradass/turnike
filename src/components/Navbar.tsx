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
import { setCurrentUser, setDrawer, setEvents, setLoading, setSearchEvents } from '../redux/appSlice';
import { toast } from 'react-toastify';
import { RootState } from '../redux/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import eventService from '../services/EventService';
import { CategoryType, EventType } from '../types/Types';
import { useEffect, useState } from 'react';
import categoryService from '../services/CategoryService';
import "../css/Navbar.css"
import { setBasket } from '../redux/basketSlice';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.app);
    const { searchEvents } = useSelector((state: RootState) => state.app);
    const { basket } = useSelector((state: RootState) => state.basket);
    const [categories, setCategories] = useState<CategoryType[]>();
    const [visible, setVisible] = useState<boolean>();


    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true));
            const categories: CategoryType[] = await categoryService.gettAllCategories();
            setCategories(categories);
        } catch (error) {
            toast.error("Kategoriler Getirilirken Hata Oluştu")
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleCategory = async (e: React.FormEvent<HTMLLIElement>, categoryName: string) => {
        try {
            dispatch(setLoading(true));
            const events: EventType[] = await categoryService.getEventsByCategoryName(categoryName);
            navigate("/category/" + categoryName)
            dispatch(setEvents(events));
            localStorage.setItem("categoryEvent", JSON.stringify(events))
        } catch (error) {
            toast.error("Etkinlikler Getirilirken Hata Oluştu")
        } finally {
            dispatch(setLoading(false));
        }
    }

    const logoButton = async () => {
        try {
            dispatch(setLoading(true));
            const events: EventType[] = await eventService.getAllEvents();
            dispatch(setEvents(events));
            navigate("/")
        } catch (error) {
            toast.error("Etkinlikler Getirilirken Hata Oluştu")
        } finally {
            dispatch(setLoading(false))
        }
    }

    const logout = async () => {
        try {
            dispatch(setLoading(true));
            localStorage.removeItem("currentUser");
            dispatch(setCurrentUser(null))
            const events: EventType[] = await eventService.getAllEvents();
            dispatch(setEvents(events));
            dispatch(setDrawer(false))
            dispatch(setBasket([]))
            toast.success("Çıkış Yapıldı");
        } catch (error) {
            toast.error("Çıkış Yapılamadı");
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleFilter = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            if (e.target.value) {
                dispatch(setSearchEvents(e.target.value));
                setVisible(true)
            } else {
                setVisible(false);
            }
        } catch (error) {
            toast.error("Filtreleme Yaparken Hata Oluştu")
        }
    }

    const openDrawer = () => {
        dispatch(setDrawer(true))
    }

    useEffect(() => {
        getAllCategories();
    }, [])
    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="fixed" color='default'
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", height: "100px", zIndex: "1" }}
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
                                onClick={logoButton}
                            >
                                <img src={turnike} width={200} height={80} />
                            </IconButton>
                            {
                                categories && categories.map((category: CategoryType, index: number) => (
                                    <MenuItem onClick={(e: React.FormEvent<HTMLLIElement>) => handleCategory(e, category.name)} key={index} className='menu-item' sx={{ display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: "25px" }}>
                                        {category.name == "cinema" && <LuPopcorn size={30} />}
                                        {category.name == "concert" && <FaMusic size={30} />}
                                        {category.name == "theatre" && <GiDramaMasks size={30} />}
                                        {category.name == "standup" && <PiMicrophoneStageFill size={30} />}
                                        <Typography
                                            sx={{ textAlign: 'center', fontWeight: "", fontSize: "15px", fontFamily: "inherit" }}>
                                            {category.name == "cinema" && "Sinema"}
                                            {category.name == "concert" && "Konser"}
                                            {category.name == "theatre" && "Tiyatro"}
                                            {category.name == "standup" && "Stand Up"}
                                        </Typography>
                                    </MenuItem>
                                ))
                            }
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                            <Paper
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: 30, width: 250, borderRadius: "20px" }}
                            >
                                <InputBase
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFilter(e)}
                                    sx={{ ml: 1, flex: 1, cursor: "text" }}
                                    id='searchInput'
                                    placeholder="Etkinlik Arayınız..."
                                />
                                <SearchIcon
                                    sx={{ marginRight: "5px" }}
                                />
                            </Paper>
                            <div className='main-search' style={{ visibility: visible ? "visible" : "hidden" }}>
                                {
                                    searchEvents && searchEvents.map((event: EventType, index: number) => (
                                        <div className='search-item' onClick={() => navigate("/event-detail/" + event.id)} key={index}>
                                            <img className='search-foto' src={event.image} width={60} />
                                            <div className='search-title'>
                                                <h3>{event.name}</h3>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <PersonIcon />
                            {
                                currentUser ?
                                    <div onClick={openDrawer} style={{ cursor: "pointer" }}>
                                        <Badge badgeContent={basket.length} color='error' sx={{ margin: "0px 10px" }} >
                                            <ShoppingCartIcon sx={{ marginRight: "10px" }} />
                                        </Badge>
                                        <Button onClick={logout} sx={{ fontWeight: "bold", borderRadius: "25px" }} color='inherit'>Çıkış Yap</Button>
                                    </div> : <>
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