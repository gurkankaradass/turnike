import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import EventDetail from '../pages/EventDetail'
import CategoryPage from '../pages/CategoryPage'

function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/event-detail/:eventId' element={<EventDetail />} />
            <Route path='/category/:categoryName' element={<CategoryPage />} />
        </Routes>
    )
}

export default RouterConfig