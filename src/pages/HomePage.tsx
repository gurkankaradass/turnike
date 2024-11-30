import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { EventType, UserType } from "../types/Types";
import { setCurrentUser, setEvents, setLoading } from "../redux/appSlice";
import eventService from "../services/EventService";
import { toast } from "react-toastify";
import { RootState } from "../redux/store";
import EventCard from "../components/EventCard";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

function HomePage() {

    const dispatch = useDispatch();
    const { events } = useSelector((state: RootState) => state.app);

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

    useEffect(() => {
        if (events.length === 0) {
            getAllEvents();
        }
    }, [])

    useEffect(() => {
        const result = localStorage.getItem("currentUser")
        if (result) {
            const currentUser: UserType = JSON.parse(result) as UserType;
            dispatch(setCurrentUser(currentUser))
        }
    }, []);



    return (
        <div>
            <Navbar />
            <Container>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginTop: "120px" }}>
                    {
                        events && events.map((event: EventType, index: number) => (
                            <EventCard key={index} event={event} />
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default HomePage