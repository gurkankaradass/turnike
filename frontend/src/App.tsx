import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterConfig from './config/RouterConfig'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';
import { useDispatch } from 'react-redux';
import eventService from './services/EventService';
import { EventType, UserType } from './types/Types';
import { setCurrentUser, setEvents } from './redux/appSlice';
import { useEffect } from 'react';
import { setBasket } from './redux/basketSlice';
import BasketDetail from './components/BasketDetail';
import { setTicket } from './redux/ticketSlice';

function App() {

  const dispatch = useDispatch();

  const getAllEvents = async () => {
    const events: EventType[] = await eventService.getAllEvents();
    dispatch(setEvents(events));
  }

  useEffect(() => {
    getAllEvents();
  }, [])

  useEffect(() => {
    const currentUserString: string | null = localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: UserType = JSON.parse(currentUserString) as UserType;
      dispatch(setCurrentUser(currentUser))
    }
  }, [])

  useEffect(() => {
    const basketString: string | null = localStorage.getItem("basket")
    if (basketString) {
      const basket: EventType[] = JSON.parse(basketString) as EventType[];
      dispatch(setBasket(basket))
    }
  }, [])

  useEffect(() => {
    const ticketString: string | null = localStorage.getItem("ticket")
    if (ticketString) {
      const ticket: EventType[] = JSON.parse(ticketString) as EventType[];
      dispatch(setTicket(ticket))
    }
  }, [])

  return (
    <>
      <RouterConfig />
      <ToastContainer autoClose={1500} style={{ fontSize: "17px" }} />
      <Spinner />
      <BasketDetail />
    </>

  )
}

export default App
