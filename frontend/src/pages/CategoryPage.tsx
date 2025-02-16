import { Container } from "@mui/material"
import Navbar from "../components/Navbar"
import { EventType } from "../types/Types"
import EventCard from "../components/EventCard"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { setEvents } from "../redux/appSlice";
import Footer from "../components/Footer";


function CategoryPage() {
    const { events } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        const result = localStorage.getItem("categoryEvent");
        if (result) {
            const currentEvents: EventType[] = JSON.parse(result) as EventType[];
            dispatch(setEvents(currentEvents))
        }
    }, [])
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Navbar />
            <Container>
                <div style={{ marginTop: "120px" }}>
                    <div>
                        <h1 style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "15px" }}>
                            {events && events[0]?.category === "cinema" && "Sinema Filmleri"}
                            {events && events[0]?.category === "concert" && "Konserler"}
                            {events && events[0]?.category === "theatre" && "Tiyatro Oyunları"}
                            {events && events[0]?.category === "standup" && "Stand Up Gösterileri"}
                        </h1>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                        {
                            events && events.map((event: EventType, index: number) => (
                                <EventCard key={index} event={event} />
                            ))
                        }
                    </div>

                </div>
            </Container>
            <Footer />
        </div>
    )
}

export default CategoryPage