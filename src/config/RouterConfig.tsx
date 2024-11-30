import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import EventDetail from '../pages/EventDetail'

function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/event-detail/:eventId' element={<EventDetail />} />
        </Routes>
    )
}

export default RouterConfig