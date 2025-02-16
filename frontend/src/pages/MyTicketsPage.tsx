import { useDispatch, useSelector } from "react-redux";
import "../css/MyTickets.css"
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { EventType } from "../types/Types";
import { setEvents, setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";
import eventService from '../services/EventService';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoTicket } from "react-icons/io5";



function MyTicketsPage() {
    const { ticket } = useSelector((state: RootState) => state.ticket);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        getAllEvents();
    }
    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <div className="ticketTitle-div" >
                    <h1 className='tickets-title'>Satın Alınan Biletler</h1>
                </div>
                <hr style={{ marginBottom: "25px" }} />
                {
                    ticket.length === 0 ?
                        <div className="emptyTickets-div">
                            <IoTicket style={{ fontSize: "150px" }} />
                            <p style={{ margin: "15px 20px", fontWeight: "bolder" }}>Satın Alınan Bir Bilet Bulunmamaktadır...</p>
                            <button onClick={lookEvents}>Etkinliklere Göz At</button>
                        </div>
                        : <>
                            {
                                ticket.map((event: EventType, index: number) => (
                                    <div key={index}>
                                        <div className='mainTicket' onClick={() => navigate("/event-detail/" + event.id)}>
                                            <div className='eventImgAndTitleDiv-ticket'>
                                                <div className='ticketImg-div'>
                                                    <img className='ticket-image' src={event.image} width={100} height={133} />
                                                </div>
                                                <div className='ticket'>
                                                    <div>
                                                        <h2 className='ticketTitle'>{event.name}</h2>
                                                    </div>
                                                    <div className="ticketInfo">
                                                        <div className='location' style={{ width: "50%" }}>
                                                            <LocationOnIcon sx={{ color: "black", fontSize: "20px", marginRight: "3px" }} />
                                                            <span>{event.address}</span>
                                                        </div>
                                                        <div className='date' style={{ width: "25%" }}>
                                                            <WatchLaterIcon sx={{ color: "black", fontSize: "20px", marginRight: "3px" }} />
                                                            <span>{event.date}</span>
                                                        </div>
                                                        <div className='ticketCount-div'>
                                                            <span><IoTicket style={{ color: "black", fontSize: "20px", marginRight: "3px" }} />{event.count}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </>
                }
            </Container>
            <Footer />
        </div>
    )
}

export default MyTicketsPage