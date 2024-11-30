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

function EventDetail() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const [event, setEvent] = useState<EventType | null>()

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
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ marginTop: "120px" }}>
                {
                    event && <>
                        <div className='main'>
                            <div className='image-div'>
                                <div>
                                    <img className='image' src={event.image} width={300} height={400} />
                                </div>
                            </div>

                            <div className='detail-div'>
                                <div className='title-div'>
                                    <h1>{event.name}</h1>
                                    <div className="info">
                                        <p className='category'>
                                            <LocalOfferIcon sx={{ color: "black", fontSize: "20px", marginRight: "5px", fontWeight: "bolder" }} />
                                            {event.category == "cinema" && "Sinema"}
                                            {event.category == "concert" && "Konser"}
                                            {event.category == "theatre" && "Tiyatro"}
                                            {event.category == "standup" && "Stand Up"}</p>
                                        {
                                            event.adress && <p className='location'>
                                                <LocationOnIcon sx={{ color: "black", fontSize: "20px", marginRight: "3px", fontWeight: "bolder" }} />
                                                {event.adress}
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
        </>

    )
}

export default EventDetail