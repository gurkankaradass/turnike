export interface UserType {
    id?: string,
    name: string,
    surname: string,
    email: string,
    phone: number,
    password: string,
    balance?: number
}

export interface EventType {
    id: number;
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

export interface CategoryType {
    id: number,
    name: string
}