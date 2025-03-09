import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/context/UserContext';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/pages/Home';
import ForgottenPW from './components/Auth/ForgottenPW';
import Blog from './components/pages/Blogs';
import EmailCheck from './components/Auth/EmailCheck';
import Profile from './components/pages/Profile';
import BookingProcess from './components/pages/BookingProcess';
import AminDashboard from './components/pages/Admin/AdminDashboard';
import ServiceManagement from './components/pages/Admin/ServiceManagement';
import AppointmentManagement from './components/pages/Admin/AppointmentManagement';
import StaffManagerment from './components/pages/Admin/StaffManagement';
import StaffList from './components/pages/Admin/stafflist';
import TherapistList from './components/pages/Admin/therapistList';
import CustomerList from './components/pages/Admin/CustomerList';
import Schedule from './components/pages/Admin/Schedules';
import BlogList from './components/pages/Admin/BlogsList';
import FeedbackList from './components/pages/Admin/FeedBackList';
import SpaDashboard from './components/pages/Admin/SpaDashboard';
function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path='/booking' element={<BookingProcess/>}/>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/email-check" element={<EmailCheck />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<ForgottenPW />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/admin/*" element={<AminDashboard />} />
                    <Route path="/admin/services" element={<ServiceManagement />} />
                    <Route path="/admin/appointments" element={<AppointmentManagement />} />
                    <Route path="/admin/employees" element={<StaffManagerment />} />
                    <Route path="/admin/employees/staff" element={<StaffList />} />
                    <Route path="/admin/employees/specialists" element={<TherapistList />} />
                    <Route path="/admin/customers" element={<CustomerList />} />
                    <Route path="/admin/schedules" element={<Schedule />} />
                    <Route path="/admin/blogs" element={<BlogList />} />
                    <Route path="/admin/feedback" element={<FeedbackList />} />
                    <Route path="/admin/dashboard" element={<SpaDashboard />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;