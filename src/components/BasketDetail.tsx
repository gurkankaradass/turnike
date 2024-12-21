import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDrawer, setEvents, setLoading, updateBalance } from '../redux/appSlice';
import { EventType, UserType } from '../types/Types';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { calculateBasket, removeEventFromBasket, setBasket } from '../redux/basketSlice';
import { useEffect } from 'react';
import "../css/Basket.css"
import ClearIcon from '@mui/icons-material/Clear';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import eventService from '../services/EventService';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

function BasketDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { drawer, currentUser } = useSelector((state: RootState) => state.app);
    const { basket, totalAmount } = useSelector((state: RootState) => state.basket);

    const closeDrawer = () => {
        dispatch(setDrawer(false))
    }

    const removeEvent = (eventId: number) => {
        dispatch(removeEventFromBasket(eventId));
        toast.success("Etkinlik Sepetten Çıkarıldı");
    }

    const clear = () => {
        dispatch(setBasket([]))
        localStorage.removeItem("basket");
        toast.success("Sepet Temizlendi")
    }

    const buy = async () => {
        if (currentUser?.balance && currentUser?.balance >= totalAmount) {
            if (currentUser.balance) {
                const remaningTotal = currentUser.balance - totalAmount;

                const payload: UserType = {
                    ...currentUser,
                    balance: remaningTotal
                }
                dispatch(updateBalance(payload));
            }
            dispatch(setBasket([]))
            localStorage.removeItem("basket");
            toast.success("Satın Alma İşlemi Tamamlandı")
        } else {
            toast.error("Yetersiz Bakiye")
        }
    }

    const getAllEvents = async () => {
        try {
            dispatch(setLoading(true));
            const response: EventType[] = await eventService.getAllEvents();
            if (response) {
                dispatch(setEvents(response));
            }
        } catch (error) {
            toast.error("Etkinlikler Getirilemedi")
        } finally {
            dispatch(setLoading(false));
        }
    }

    const lookEvents = () => {
        navigate("/")
        closeDrawer();
        getAllEvents();
    }

    useEffect(() => {
        dispatch(calculateBasket());
    }, [basket])
    return (
        <Drawer open={drawer} anchor='right' onClose={closeDrawer}>
            <div>
                <h1 className='basket-title'>Sepet İşlemleri</h1>
            </div>
            {
                basket.length === 0 ?
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "50px" }}>
                        <ShoppingCartOutlinedIcon sx={{ fontSize: "150px" }} />
                        <p style={{ margin: "15px 20px", fontWeight: "bolder" }}>Sepetinizde Etkinlik Bulunmamaktadır...</p>
                        <button onClick={lookEvents}>Etkinliklere Göz At</button>
                    </div>
                    : <>
                        <div className='titleDiv'>
                            <h4 className='eventName'>Etkinlik</h4><hr />
                            <h4 className='personCount'>Bilet Sayısı</h4><hr />
                            <h4 className='priceDiv'>Fiyat</h4><hr />
                            <h4 className='deleteEvent'>Çıkar</h4>
                        </div>
                        <hr />
                        {
                            basket.map((event: EventType, index: number) => (
                                <div key={index}>
                                    <div className='mainBasket'>
                                        <div className='eventImgAndTitleDiv'>
                                            <div className='basketImg'>
                                                <img className='basket-image' src={event.image} width={100} height={133} />
                                            </div>
                                            <div className='eventInfo-div'>
                                                <h3 className='eventTitle'>{event.name}</h3>
                                                <div className='location' style={{ marginBottom: "5px" }}>
                                                    <LocationOnIcon sx={{ color: "black", fontSize: "20px", marginRight: "3px" }} />
                                                    <span>{event.address}</span>
                                                </div>
                                                <div className='date'>
                                                    <WatchLaterIcon sx={{ color: "black", fontSize: "20px", marginRight: "3px" }} />
                                                    <span>{event.date}</span>
                                                </div>
                                            </div>
                                        </div><hr />
                                        <div className='eventCount-div'>
                                            <span>x{event.count}</span>
                                        </div><hr />
                                        <div className='eventPrice-div'>
                                            <h4>
                                                {event.totalPrice}₺
                                            </h4>
                                        </div><hr />
                                        <div className='removeEvent-div'>
                                            <Button sx={{ textTransform: "none" }} variant='text' size='small' color='error' onClick={() => removeEvent(event.id)}><ClearIcon /></Button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                    </>
            }
            <div className='basketAmount-div'>
                {
                    basket.length !== 0 ? <>
                        <div className='basketAmount'>
                            <h3 className='basketAmount-title'>Sepet Tutarı:</h3><h3>{totalAmount.toFixed(2)}₺</h3>
                        </div>
                        <div>
                            <button onClick={clear} style={{ textTransform: "none", marginRight: "15px" }} color='error'>Sepeti Temizle</button>
                            <button
                                onClick={buy}
                                style={{ textTransform: "none" }} color='success'>Satın Al</button>
                        </div>
                    </> : <></>
                }
            </div>
        </Drawer>
    )
}

export default BasketDetail