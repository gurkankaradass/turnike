import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import basketReducer from "./basketSlice"
import ticketReducer from "./ticketSlice"

export const store = configureStore({
    reducer: {
        app: appReducer,
        basket: basketReducer,
        ticket: ticketReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch