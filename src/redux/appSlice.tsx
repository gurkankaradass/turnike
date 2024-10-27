import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventType, UserType } from '../types/Types'

export interface AppSliceType {
    currentUser: UserType | null,
    loading: boolean,
    events: EventType[]
}

const initialState: AppSliceType = {
    currentUser: null,
    loading: false,
    events: []
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state: AppSliceType, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCurrentUser: (state: AppSliceType, action: PayloadAction<UserType | null>) => {
            state.currentUser = action.payload;
        },
        setEvents: (state: AppSliceType, action: PayloadAction<EventType[]>) => {
            state.events = action.payload;
        }
    }
})

export const { setLoading, setCurrentUser, setEvents } = appSlice.actions

export default appSlice.reducer