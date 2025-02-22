import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import EventDetail from '../pages/EventDetail'
import CategoryPage from '../pages/CategoryPage'
import MyTicketsPage from '../pages/MyTicketsPage'
import AccountSettingsPage from '../pages/AccountSettingsPage'
import AdminPanelPage from '../pages/AdminPanelPage'

function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/event-detail/:eventId' element={<EventDetail />} />
            <Route path='/category/:categoryName' element={<CategoryPage />} />
            <Route path='/tickets' element={<MyTicketsPage />} />
            <Route path='/account' element={<AccountSettingsPage />} />
            <Route path='/adminPanel' element={<AdminPanelPage />} />
        </Routes>
    )
}

export default RouterConfig