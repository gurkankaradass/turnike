import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CategoryType, EventType, UserType } from "../types/Types";
import { setCurrentUser, setEvents, setLoading } from "../redux/appSlice";
import eventService from "../services/EventService";
import { toast } from "react-toastify";
import { RootState } from "../redux/store";
import EventCard from "../components/EventCard";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/HomePage.css"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import categoryService from "../services/CategoryService";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function HomePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { events } = useSelector((state: RootState) => state.app);
    const [categories, setCategories] = useState<CategoryType[]>();

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

    const handleCategory = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, categoryName: string) => {
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
        getAllCategories();
    }, [])

    useEffect(() => {
        const result = localStorage.getItem("currentUser")
        if (result) {
            const currentUser: UserType = JSON.parse(result) as UserType;
            dispatch(setCurrentUser(currentUser))
        }
    }, []);

    const CustomArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            />
        );
    };
    const settings = {
        infinite: true, // Sonsuz kaydırma
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 200,
        cssEase: "linear",
        nextArrow: <CustomArrow />, // Sağ ok
        prevArrow: <CustomArrow />, // Sol ok
    };

    const mainSettings = {
        dots: true,
        infinite: true, // Sonsuz kaydırma
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 4000,
        cssEase: "linear"
    };

    return (
        <div>
            <Navbar />
            <Container>
                <div className='mainSlider' style={{ marginTop: "120px" }} >
                    <Slider {...mainSettings}>
                        {
                            events.filter((sliderEvent: EventType) => sliderEvent.sliderImage)
                                .map((sliderEvent: EventType, index: number) => (
                                    <div key={index}>
                                        <img onClick={() => navigate("/event-detail/" + sliderEvent.id)} src={sliderEvent.sliderImage} width={"100%"} height={"600px"} style={{ cursor: "pointer" }} />
                                    </div>
                                ))
                        }
                    </Slider>
                </div>
            </Container>
            <Container>
                {categories?.map((category) => (
                    <div key={category.id} style={{ margin: "25px 0px" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: category.name === "cinema" ? "50px" : "0" }}>
                            <h1 className="slider-title">
                                {category.name == "cinema" && "Sinema Filmleri"}
                                {category.name == "concert" && "Konserler"}
                                {category.name == "theatre" && "Tiyatro Oyunları"}
                                {category.name == "standup" && "Stand Up Gösterileri"}</h1>
                            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleCategory(e, category.name)} className="discover-button">Tümünü Keşfet<ArrowRightIcon sx={{ marginLeft: "8px" }} /></button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginBottom: "25px" }}>
                            <Container>
                                <div className="slider-container">
                                    <Slider {...settings}>
                                        {events &&
                                            events
                                                .filter((event: EventType) => event.category === category.name)
                                                .slice(0, 8) // İlk 8 öğeyi al
                                                .map((event: EventType, index: number) => (
                                                    <EventCard key={index} event={event} />
                                                ))}
                                    </Slider>
                                </div>
                            </Container>
                        </div>
                        <hr />
                    </div>
                ))}
            </Container>
            <Footer />
        </div>
    )
}

export default HomePage