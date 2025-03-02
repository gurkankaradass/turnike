import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Container, DialogActions, DialogContentText, DialogTitle, InputAdornment, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';
import eventService from '../services/EventService';
import { EventType } from '../types/Types';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Footer from '../components/Footer';
import { addEventToBasket } from '../redux/basketSlice';
import { RootState } from '../redux/store';
import EventCard from '../components/EventCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaLock } from 'react-icons/fa';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import "../css/AdminPanel.css"
import { useFormik } from 'formik';
import { schemaAddEvent } from '../schema/Schema';
import { CategoryType, CityType } from "../types/Types";
import EventService from '../services/EventService';
import CategoryService from '../services/CategoryService';
import CitiesServices from '../services/CitiesServices';

function EventDetail() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const [event, setEvent] = useState<EventType | null>()
    const [count, setCount] = useState(0)
    const [categories, setCategories] = useState<CategoryType[]>();
    const [cities, setCities] = useState<CityType[]>();
    const navigate = useNavigate();

    const { currentUser, admin, events } = useSelector((state: RootState) => state.app);

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClickOpen = () => {
        if (admin) {
            setOpen1(true);
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        if (admin) {
            setOpen1(false);
        } else {
            setOpen(false);
        }
    };

    const deleteEvent = async () => {
        try {
            dispatch(setLoading(true));
            if (eventId) {
                const response = await eventService.deleteEvent(eventId);
                if (response) {
                    toast.success(response.message);
                    navigate("/")
                }
            }
        } catch (error: any) {
            toast.error(error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    const getEventById = async (eventId: string) => {
        try {
            dispatch(setLoading(true));
            const event: EventType = await eventService.getEventById(eventId);
            setEvent(event);
        } catch (error: any) {
            toast.error("Etkinlik Getirilemedi");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true));
            const categories: CategoryType[] = await CategoryService.gettAllCategories();
            setCategories(categories);
        } catch (error) {
            toast.error("Kategoriler Getirilirken Hata Oluştu")
        } finally {
            dispatch(setLoading(false));
        }
    }

    const getAllCities = async () => {
        try {
            dispatch(setLoading(true));
            const cities: CityType[] = await CitiesServices.gettAllCities();
            setCities(cities);
        } catch (error) {
            toast.error("Şehirler Getirilirken Hata Oluştu")
        } finally {
            dispatch(setLoading(false));
        }
    }

    const addBasket = () => {
        if (currentUser) {
            try {
                dispatch(setLoading(true))
                if (event && count) {
                    const payload: EventType = {
                        ...event,
                        count: count,
                        totalPrice: (count * event.price)
                    }
                    dispatch(addEventToBasket(payload))
                    setOpen(false);
                    toast.success("Ürün Sepete Eklendi")
                    setCount(0);
                }
            } catch (error) {
                toast.error("Etkinlik Sepete Eklenemedi")
            } finally {
                dispatch(setLoading(false))
            }
        } else {
            navigate("/login")
            toast.warning("Bilet Alabilmek için Giriş Yapmalısınız")
        }
    }

    const submit = async (values: any, action: any) => {
        try {
            dispatch(setLoading(true));
            const payload: EventType = {
                name: values.name,
                date: values.date,
                details: values.details,
                image: values.image,
                sliderImage: values.sliderImage,
                category: values.category,
                address: values.address,
                map: values.map,
                price: values.price,
                city: values.city,
            };
            if (eventId) {
                const response = await EventService.updateEvent(eventId, payload);
                if (response && response.success) {
                    toast.success(response.message);
                    setOpen1(false)
                    window.location.reload();
                } else {
                    toast.error("Beklenmeyen bir hata oluştu.");
                }
            }
        } catch (error: any) {
            toast.error(error.message || "Bir hata oluştu.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            name: event?.name || '',
            date: event?.date || '',
            details: event?.details || '',
            image: event?.image || '',
            sliderImage: event?.sliderImage || '',
            category: event?.category || '',
            address: event?.address || '',
            map: event?.map || '',
            price: event?.price || '',
            city: event?.city || '',
        },
        onSubmit: submit,
        validationSchema: schemaAddEvent,
        enableReinitialize: true
    });

    const settings = {
        dots: true,
        infinite: true, // Sonsuz kaydırma
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 900,
        speed: 1000,
        cssEase: "linear",
    };

    useEffect(() => {
        getEventById(String(eventId));
        getAllCategories();
        getAllCities();
    }, [])
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Navbar />
            <Container maxWidth="lg">
                {
                    event && <>
                        <div className='main'>
                            <div className='image-div'>
                                <div>
                                    <img className='image' src={event.image} width={350} height={470} />
                                </div>

                                <div className='buy-div'>
                                    <button style={{ minWidth: "200px", fontFamily: "arial", fontWeight: "bolder", fontSize: "20px", borderRadius: "20px" }} onClick={handleClickOpen}>
                                        {
                                            admin ?
                                                <span style={{ justifyContent: "center", }}>ETKİNLİĞİ DÜZENLE</span>
                                                : <span style={{ justifyContent: "center", }}>BİLET AL</span>
                                        }
                                    </button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <DialogContent sx={{
                                            backgroundColor: "rgb(245, 245, 245)",
                                            minWidth: "500px",
                                            maxWidth: "550px"
                                        }}
                                        >
                                            <h2 style={{ marginBottom: "10px" }}>{event.name}</h2>
                                            <div className='ticket-div'>
                                                <div style={{ width: "65%" }}>
                                                    <span style={{ marginBottom: "10px" }}><LocationOnIcon sx={{ color: "black", fontSize: "20px", marginRight: "5px" }} />{event.address}</span>
                                                    <span><WatchLaterIcon sx={{ color: "black", fontSize: "20px", marginRight: "5px" }} />{event.date}</span>
                                                </div>
                                                <hr style={{ height: "125px", margin: "0px 15px" }} />
                                                <div className='buy'>
                                                    <p className='price'>{event.price} ₺</p>
                                                    {
                                                        admin ? <div></div> :
                                                            <div style={{ display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
                                                                <div className='count-div'>
                                                                    <p>Adet: </p><RemoveCircleIcon onClick={() => {
                                                                        if (count > 0) {
                                                                            setCount(count - 1)
                                                                        }
                                                                    }} sx={{ margin: "0px 5px", cursor: "pointer" }} /> <p style={{ fontSize: "25px" }}>{count}</p> <AddCircleIcon onClick={() => setCount(count + 1)} sx={{ margin: "0px 5px", cursor: "pointer" }} />
                                                                </div>
                                                                <button onClick={addBasket} style={{ width: "150px" }}>Sepete Ekle</button>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog
                                        open={open1}
                                        onClose={handleClose}
                                    >
                                        <DialogContent sx={{
                                            backgroundColor: "rgb(245, 245, 245)",
                                            minWidth: "500px",
                                            maxWidth: "550px"
                                        }}
                                        >
                                            <div>
                                                <form className='form-div' onSubmit={handleSubmit}>
                                                    <h2 className='title'>ETKİNLİK BİLGİLERİ</h2>
                                                    <div className='adminInput-div'>
                                                        <div className='left'>
                                                            <TextField
                                                                id="name"
                                                                label="Etkinlik Adı"
                                                                value={values.name}
                                                                onChange={handleChange}
                                                                sx={{ marginBottom: "10px", width: "100%" }}
                                                                variant="standard"
                                                                helperText={errors.name && <span className='error-span'>{errors.name}</span>}
                                                            />
                                                            <FormControl sx={{ margin: "10px 0px" }} fullWidth>
                                                                <InputLabel sx={{ zIndex: "1" }} id="category-label">Kategori Seç</InputLabel>
                                                                <Select
                                                                    size='medium'
                                                                    labelId="category-label"
                                                                    id="category"
                                                                    name="category"
                                                                    value={values.category}
                                                                    onChange={handleChange}
                                                                    sx={{ marginBottom: "10px", width: "100%" }}

                                                                >
                                                                    {
                                                                        categories?.map((category) => (
                                                                            <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                                                                        ))
                                                                    }
                                                                </Select>
                                                                <FormHelperText>
                                                                    {errors.category && <span style={{ marginLeft: "-13px", marginTop: "-10px" }} className='error-span'>{errors.category}</span>}
                                                                </FormHelperText>
                                                            </FormControl>
                                                            <TextField
                                                                id="details"
                                                                label="Etkinlik Detayı"
                                                                value={values.details}
                                                                onChange={handleChange}
                                                                sx={{ marginBottom: "10px", width: "100%" }}
                                                                variant="standard"
                                                                helperText={errors.details && <span className='error-span'>{errors.details}</span>}
                                                            />
                                                            <TextField
                                                                id="image"
                                                                label="Fotoğraf URL"
                                                                value={values.image}
                                                                onChange={handleChange}
                                                                sx={{ marginBottom: "10px", width: "100%" }}
                                                                variant="standard"
                                                                helperText={errors.image && <span className='error-span'>{errors.image}</span>}
                                                            />
                                                            <TextField
                                                                id="sliderImage"
                                                                label="Slider Fotoğrafı (Varsa)"
                                                                value={values.sliderImage}
                                                                onChange={handleChange}
                                                                sx={{ marginBottom: "10px", width: "100%" }}
                                                                variant="standard"
                                                            />
                                                        </div>
                                                        <div className='right'>
                                                            <TextField
                                                                id="date"
                                                                label="Tarih (YYYY-AA-GG)"
                                                                value={values.date}
                                                                onChange={handleChange}
                                                                sx={{ marginBottom: "10px", width: "100%" }}
                                                                variant="standard"
                                                                helperText={errors.date && <span className='error-span'>{errors.date}</span>}
                                                            />
                                                            <FormControl sx={{ margin: "10px 0px" }} fullWidth>
                                                                <InputLabel sx={{ zIndex: "1" }} id="city-label">Şehir Seç</InputLabel>
                                                                <Select
                                                                    size='medium'
                                                                    labelId="city-label"
                                                                    id="city"
                                                                    name='city'
                                                                    value={values.city}
                                                                    onChange={handleChange}
                                                                    sx={{ marginBottom: "10px", width: "100%" }}

                                                                >
                                                                    {
                                                                        cities?.map((city) => (
                                                                            <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
                                                                        ))
                                                                    }
                                                                </Select>
                                                                <FormHelperText>
                                                                    {errors.city && <span style={{ marginLeft: "-13px", marginTop: "-10px" }} className='error-span'>{errors.city}</span>}
                                                                </FormHelperText>
                                                            </FormControl>
                                                            <TextField
                                                                id="address"
                                                                label="Mekan İsmi"
                                                                value={values.address}
                                                                onChange={handleChange}
                                                                sx={{ marginBottom: "10px", width: "100%" }}
                                                                variant="standard"
                                                                helperText={errors.address && <span className='error-span'>{errors.address}</span>}
                                                            />
                                                            <TextField
                                                                id="map"
                                                                label="Harita URL"
                                                                value={values.map}
                                                                onChange={handleChange}
                                                                sx={{ marginBottom: "10px", width: "100%" }}
                                                                variant="standard"
                                                                helperText={errors.map && <span className='error-span'>{errors.map}</span>}
                                                            />
                                                            <TextField
                                                                id="price"
                                                                label="Ücret"
                                                                type='number'
                                                                value={values.price}
                                                                onChange={handleChange}
                                                                sx={{ marginBottom: "10px", width: "100%" }}
                                                                variant="standard"
                                                                helperText={errors.price && <span className='error-span'>{errors.price}</span>}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='button-div' style={{ marginTop: "20px" }}>
                                                        <button type='submit' className='submit'>Etkinliği Güncelle</button>
                                                        <button type='reset' className='reset'>Temizle</button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => setOpen2(true)} type='button' className='login-button'>Etkinliği Sil</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog open={open2} onClose={() => setOpen2(false)}>
                                        <DialogTitle>
                                            <h3>Etkinliği Sil</h3></DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Etkinliği silmek istediğinize emin misiniz?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions sx={{ marginBottom: "10px" }}>
                                            <button style={{ width: "70px" }} onClick={() => setOpen2(false)} className='reset'>İptal</button>
                                            <button style={{ width: "70px" }} onClick={deleteEvent} className='submit'>Evet</button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>

                            <div className='detail-div'>
                                <div className='title-div'>
                                    <h1>{event.name}</h1>
                                    <div className="info">
                                        <p className='category'>
                                            <LocalOfferIcon sx={{ color: "black", fontSize: "20px", marginRight: "5px" }} />
                                            {event.category}</p>
                                        {
                                            event.address && <p className='location'>
                                                <LocationOnIcon sx={{ color: "black", fontSize: "20px", marginRight: "3px" }} />
                                                {event.address}
                                            </p>
                                        }
                                        {
                                            event.date && <p className='date'>
                                                <WatchLaterIcon sx={{ color: "black", fontSize: "20px", marginRight: "3px" }} />
                                                {event.date}
                                            </p>
                                        }
                                    </div>
                                </div>
                                <div className='detail'>
                                    <p className='detail-text'>{event.details}</p>
                                </div>
                                {
                                    event.map && <div>
                                        <iframe style={{ borderRadius: "20px", width: "100%", border: "none" }} src={event.map} height={200}></iframe>
                                    </div>
                                }
                            </div>

                        </div>
                    </>
                }
                <hr />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap", margin: "25px 0px" }}>
                    <Container>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "left" }}>
                            <h1 className='slider-title' style={{ marginLeft: "10px" }}>
                                Benzer Etkinlikler
                            </h1>
                        </div>
                        <div className="mainSlider">
                            <Slider {...settings}>
                                {events &&
                                    events
                                        .filter((sliderEvent: EventType) => sliderEvent.category === event?.category && sliderEvent.id !== event.id)
                                        .slice(0, 8) // İlk 8 öğeyi al
                                        .map((event: EventType, index: number) => (
                                            < EventCard key={index} event={event} />
                                        ))}
                            </Slider>
                        </div>
                    </Container>
                </div>
            </Container>
            <Footer />
        </div>

    )
}

export default EventDetail