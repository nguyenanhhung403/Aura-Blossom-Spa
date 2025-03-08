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
function App() {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path='/booking' element={<BookingProcess/>}/>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/email-check" element={<EmailCheck />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<ForgottenPW />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </UserProvider>
        </Router>
    );
}
export default App;