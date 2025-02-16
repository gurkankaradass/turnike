import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventType } from '../types/Types'

export interface BasketSliceType {
    basket: EventType[],
    totalAmount: number
}

const initialState: BasketSliceType = {
    basket: [],
    totalAmount: 0
}

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state: BasketSliceType, action: PayloadAction<EventType[]>) => {
            state.basket = [...action.payload]
        },

        addEventToBasket: (state: BasketSliceType, action: PayloadAction<EventType>) => {
            if (state.basket.length == 0) { //Sepette Etkinlik Yoksa
                state.basket = [action.payload];
            } else { //Sepette Etkinlik Varsa
                const findEvent = state.basket.find((event: EventType) => event.id === action.payload.id);
                if (findEvent) { //Etkinlik Daha Önce Eklenmişse
                    if (findEvent.count && findEvent.totalPrice && action.payload.count && action.payload.totalPrice) { // Count Doluysa

                        findEvent.count = findEvent.count + action.payload.count;
                        findEvent.totalPrice = findEvent.totalPrice + action.payload.totalPrice;

                        state.basket = [...state.basket.map((event: EventType) =>
                            event.id === findEvent.id ? findEvent : event
                        )]
                    }
                } else { //Etkinlik Daha Önce Eklenmemişse
                    state.basket = [...state.basket, action.payload]
                }
            }
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        calculateBasket: (state: BasketSliceType) => {
            let total: number = 0;
            state.basket && state.basket.map((event: EventType) => {
                if (event.count) {
                    total += event.price * event.count;
                }
            })
            state.totalAmount = total;
        },
        removeEventFromBasket: (state: BasketSliceType, action: PayloadAction<number>) => {
            state.basket = [...state.basket.filter((event: EventType) => event.id !== action.payload)];
            localStorage.setItem("basket", JSON.stringify(state.basket));
        }
    }
})

export const { setBasket, addEventToBasket, calculateBasket, removeEventFromBasket } = basketSlice.actions
export default basketSlice.reducer