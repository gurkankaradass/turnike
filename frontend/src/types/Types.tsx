export interface UserType {
    id?: string,
    name: string,
    surname: string,
    email: string,
    phone: number,
    password: string,
    balance?: number
}

export interface AdminType {
    username: string,
    password: string
}

export interface EventType {
    id?: number;
    name: string;
    image: string;
    sliderImage?: string;
    category: string;
    date: string;
    details: string;
    address: string;
    city: string;
    price: number;
    map: string;
    count?: number,
    totalPrice?: number
}

export interface TicketType {
    id: number;
    event_name: string;
    image: string;
    address: string;
    date: string;
    quantity: number;
}

export interface CategoryType {
    id: number,
    name: string
}

export interface CityType {
    id: number,
    name: string
}