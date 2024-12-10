import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Container } from '@mui/material'
import { useDispatch } from 'react-redux';
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

function EventDetail() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const [event, setEvent] = useState<EventType | null>()
    const [count, setCount] = useState(0)

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getEventById = async (eventId: string) => {
        try {
            dispatch(setLoading(true))
            const event: EventType = await eventService.getEventById(eventId)
            setEvent(event);
        } catch (error) {
            toast.error("Etkinlik Getirilemedi")
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        getEventById(String(eventId));
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
                                    <button style={{ width: "200px", fontFamily: "arial", fontWeight: "bolder", fontSize: "20px", borderRadius: "20px" }} onClick={handleClickOpen}>
                                        BİLET AL
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
                                                    <div className='count-div'>
                                                        <p>Adet: </p><RemoveCircleIcon onClick={() => {
                                                            if (count > 0) {
                                                                setCount(count - 1)
                                                            }
                                                        }} sx={{ margin: "0px 5px", cursor: "pointer" }} /> <p style={{ fontSize: "25px" }}>{count}</p> <AddCircleIcon onClick={() => setCount(count + 1)} sx={{ margin: "0px 5px", cursor: "pointer" }} />
                                                    </div>
                                                    <button onClick={handleClose} style={{ width: "150px" }}>Sepete Ekle</button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            <div className='detail-div'>
                                <div className='title-div'>
                                    <h1>{event.name}</h1>
                                    <div className="info">
                                        <p className='category'>
                                            <LocalOfferIcon sx={{ color: "black", fontSize: "20px", marginRight: "5px" }} />
                                            {event.category == "cinema" && "Sinema"}
                                            {event.category == "concert" && "Konser"}
                                            {event.category == "theatre" && "Tiyatro"}
                                            {event.category == "standup" && "Stand Up"}</p>
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
                                    event.map && <div style={{
                                        // marginTop: "auto"
                                    }}>
                                        <iframe style={{ borderRadius: "20px", width: "100%", border: "none" }} src={event.map} height={200}></iframe>
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                }

            </Container>
            <Footer />
        </div>

    )
}

export default EventDetail