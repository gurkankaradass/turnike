import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Container, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import "../css/AdminPanel.css"
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { schemaAddEvent } from '../schema/Schema';
import { CategoryType, CityType, EventType } from "../types/Types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setEvents, setLoading } from "../redux/appSlice";
import EventService from '../services/EventService';
import CategoryService from '../services/CategoryService';
import { useEffect, useState } from 'react';
import CitiesServices from '../services/CitiesServices';
import { RootState } from '../redux/store';
import EventCard from '../components/EventCard';

const AdminPanelPage = () => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState<CategoryType[]>();
    const [cities, setCities] = useState<CityType[]>();
    const { events } = useSelector((state: RootState) => state.app)

    const getAllEvents = async () => {
        try {
            dispatch(setLoading(true));
            const response: EventType[] = await EventService.getAllEvents();
            if (response) {
                dispatch(setEvents(response));
                console.log(response)
            }
        } catch (error) {
            toast.error("Etkinlikler Getirilemedi")
        } finally {
            dispatch(setLoading(false));
        }
    }

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

            const response = await EventService.addEvent(payload);

            if (response && response.success) {
                toast.success(response.message);
                resetForm();
            } else {
                toast.error("Beklenmeyen bir hata oluştu.");
            }
        } catch (error: any) {
            toast.error(error.message || "Bir hata oluştu.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            name: '',
            date: '',
            details: '',
            image: '',
            sliderImage: '',
            category: "",
            address: "",
            map: "",
            price: "",
            city: "",
        },
        onSubmit: submit,
        validationSchema: schemaAddEvent
    });

    const reset = () => {
        resetForm();
    }

    useEffect(() => {
        getAllEvents();
        getAllCategories();
        getAllCities();
    }, [])
    return (
        <div className='adminMain'>
            <Navbar />
            <Container>
                <div className='adminForm-div'>
                    <form className='adminForm' onSubmit={handleSubmit}>
                        <h2 className='adminTitle'>ETKİNLİK OLUŞTUR</h2>
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
                        <div className='adminButton-div'>
                            <button type='submit' className='submit'>Etkinlik Oluştur</button>
                            <button onClick={reset} type='reset' className='reset'>Temizle</button>
                        </div>
                    </form>
                </div>
                <div className='adminEventTitle'>
                    <h1>TÜM ETKİNLİKLER</h1>
                </div>
                <div className='adminEvents'>
                    {
                        events && events.map((event: EventType) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    }
                </div>
            </Container >
            <Footer />
        </div >
    )
}

export default AdminPanelPage