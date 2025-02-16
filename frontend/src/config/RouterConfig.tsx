import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import EventDetail from '../pages/EventDetail'
import CategoryPage from '../pages/CategoryPage'
import MyTicketsPage from '../pages/MyTicketsPage'

function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/event-detail/:eventId' element={<EventDetail />} />
            <Route path='/category/:categoryName' element={<CategoryPage />} />
            <Route path='/tickets' element={<MyTicketsPage />} />
        </Routes>
    )
}

export default RouterConfig