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
    category: string,
    details: string,
    visit?: string,
    adress?: string,
    map?: string,
    price: number
}