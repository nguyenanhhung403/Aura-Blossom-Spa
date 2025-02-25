import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import './App.css';
import Login from './components/login';
import Register from './components/Register';
import Home from './pages/Home';
import ForgottenPW from './components/ForgottenPW';
function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<ForgottenPW />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;