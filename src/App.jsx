import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './pages/Home';
import ForgottenPW from './components/Auth/ForgottenPW';
import Blog from './pages/Blogs';
import EmailCheck from './components/Auth/EmailCheck';
import Profile from './pages/Profile';
function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/email-check" element={<EmailCheck />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<ForgottenPW />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;