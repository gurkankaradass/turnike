import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TicketType } from '../types/Types'

export interface TicketSliceType {
    ticket: TicketType[]
}

const initialState: TicketSliceType = {
    ticket: []
}

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        setTicket: (state: TicketSliceType, action: PayloadAction<TicketType[]>) => {
            state.ticket = [...action.payload];
        }
    }
})

export const { setTicket } = ticketSlice.actions
export default ticketSlice.reducer