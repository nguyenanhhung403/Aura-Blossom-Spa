import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/context/UserContext';
import './App.css';

// Lazy load các component
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const Home = lazy(() => import('./components/pages/Home'));
const ForgottenPW = lazy(() => import('./components/Auth/ForgottenPW'));
const Blog = lazy(() => import('./components/pages/Blogs'));
const EmailCheck = lazy(() => import('./components/Auth/EmailCheck'));
const Profile = lazy(() => import('./components/pages/Profile'));
const BookingProcess = lazy(() => import('./components/pages/BookingProcess'));
const NotFound = lazy(() => import('./components/pages/NotFound')); // Thêm trang 404

function App() {
    return (
        <UserProvider>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/booking" element={<BookingProcess />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/email-check" element={<EmailCheck />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot" element={<ForgottenPW />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="*" element={<NotFound />} /> {/* Trang 404 */}
                    </Routes>
                </Suspense>
            </Router>
        </UserProvider>
    );
}

export default App;
