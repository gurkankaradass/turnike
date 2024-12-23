export interface UserType {
    id: string,
    username: string,
    password: string,
    balance: number
}

export interface EventType {
    id: number,
    name: string,
    image: string,
    sliderImage?: string,
    category: string,
    date: string,
    details: string,
    visit?: string,
    address: string,
    map: string,
    price: number,
    count?: number,
    totalPrice?: number
}

export interface CategoryType {
    id: number,
    name: string
}