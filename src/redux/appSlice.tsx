import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventType, UserType } from '../types/Types'

export interface AppSliceType {
    currentUser: UserType | null,
    loading: boolean,
    events: EventType[],
    searchEvents: EventType[]
}

const initialState: AppSliceType = {
    currentUser: null,
    loading: false,
    events: [],
    searchEvents: []
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
        },
        setSearchEvents: (state: AppSliceType, action: PayloadAction<string>) => {
            const tempList: EventType[] = []
            state.events.map((event: EventType) => {
                if (event.name.toLowerCase().includes(action.payload.toLowerCase())) {
                    tempList.push(event);
                }
            })
            state.searchEvents = [...tempList];
        }
    }
})

export const { setLoading, setCurrentUser, setEvents, setSearchEvents } = appSlice.actions

export default appSlice.reducer