import { useDispatch, useSelector } from "react-redux";
import "../css/MyTickets.css"
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { EventType, TicketType } from "../types/Types";
import { setEvents, setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";
import eventService from '../services/EventService';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoTicket } from "react-icons/io5";
import TicketService from "../services/TicketService";
import { setTicket } from "../redux/ticketSlice";
import { useEffect } from "react";



function MyTicketsPage() {
    const { ticket } = useSelector((state: RootState) => state.ticket);
    const { currentUser } = useSelector((state: RootState) => state.app);
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


    const getTickets = async () => {
        try {
            dispatch(setLoading(true));
            if (currentUser?.id) {
                const response = await TicketService.getUserTickets(currentUser?.id);

                if (response?.success && Array.isArray(response.tickets)) {
                    // const tickets = response.tickets.map((ticket: any) => ({
                    //     id: ticket.id,
                    //     event_name: ticket.event_name,
                    //     image: ticket.image,
                    //     address: ticket.address,
                    //     date: ticket.date,
                    //     quantity: ticket.quantity,
                    // }));

                    dispatch(setTicket(response.tickets));
                }
            }
        } catch (error) {
            console.error("Bilet getirme hatası:", error);
            toast.error("Biletler Getirilemedi");
        } finally {
            dispatch(setLoading(false));
        }
    }

    const lookEvents = () => {
        navigate("/")
        getAllEvents();
    }

    useEffect(() => {
        if (currentUser?.id) {
            getTickets();
        }
    }, [currentUser]);

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
                                ticket.map((event: TicketType) => (
                                    <div key={event.id}>
                                        <div className='mainTicket' onClick={() => navigate("/event-detail/" + event.id)}>
                                            <div className='eventImgAndTitleDiv-ticket'>
                                                <div className='ticketImg-div'>
                                                    <img className='ticket-image' src={event.image} width={100} height={133} />
                                                </div>
                                                <div className='ticket'>
                                                    <div>
                                                        <h2 className='ticketTitle'>{event.event_name}</h2>
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
                                                            <span><IoTicket style={{ color: "black", fontSize: "20px", marginRight: "3px" }} />{event.quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                }
            </Container>
            <Footer />
        </div>
    )
}

export default MyTicketsPage