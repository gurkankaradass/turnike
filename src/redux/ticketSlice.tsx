import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventType } from '../types/Types'

export interface TicketSliceType {
    ticket: EventType[]
}

const initialState: TicketSliceType = {
    ticket: []
}

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        setTicket: (state: TicketSliceType, action: PayloadAction<EventType[]>) => {
            state.ticket = [...action.payload]
        },
        addEventToTickets: (state: TicketSliceType, action: PayloadAction<EventType | EventType[]>) => {
            const processEvent = (incomingEvent: EventType) => {
                const findEvent = state.ticket.find((event: EventType) => event.id === incomingEvent.id);
                if (findEvent) {
                    if (
                        typeof findEvent.count === "number" &&
                        typeof findEvent.totalPrice === "number" &&
                        typeof incomingEvent.count === "number" &&
                        typeof incomingEvent.totalPrice === "number"
                    ) {
                        findEvent.count += incomingEvent.count;
                        findEvent.totalPrice += incomingEvent.totalPrice;
                    }
                } else {
                    state.ticket = [...state.ticket, incomingEvent];
                }
            };
            if (Array.isArray(action.payload)) { // Gelen veri dizi mi yoksa tek bir nesne mi kontrol et
                action.payload.forEach(processEvent); // Dizi ise her bir elemanı işle
            } else {
                processEvent(action.payload); // Tek bir nesne ise işle
            }
            localStorage.setItem("ticket", JSON.stringify(state.ticket));
        }
    }
})

export const { setTicket, addEventToTickets } = ticketSlice.actions
export default ticketSlice.reducer