
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { UserProvider, UserContext } from "./components/context/UserContext";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/pages/Home";
import ForgottenPW from "./components/Auth/ForgottenPW";
import Blog from "./components/pages/Blogs";
import EmailCheck from "./components/Auth/EmailCheck";
import Profile from "./components/pages/Profile";
import BookingProcess from "./components/pages/BookingProcess";
import Services from "./components/pages/Services";
import Quiz from "./components/pages/Quiz";
import Therapist from "./components/pages/Therapist";
import History from "./components/pages/History";

// Component bảo vệ route
const PrivateRoute = ({ element }) => {
  const { user } = useContext(UserContext);
  return user ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/booking" element={<BookingProcess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/email-check" element={<EmailCheck />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgottenPW />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/services" element={<Services />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/therapist" element={<Therapist />} />
          
          {/* Route được bảo vệ */}
          <Route path="/history" element={<PrivateRoute element={<History />} />} />
        </Routes>
      </Router>
    </UserProvider>
  );

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
import StaffManagerment from './components/pages/Admin/Employees/StaffManagement';
import StaffList from './components/pages/Admin/Employees/StaffList';
import TherapistList from './components/pages/Admin/Employees/therapistList';
import CustomerList from './components/pages/Admin/CustomerList'; 
import Schedule from './components/pages/Admin/Schedules';
import BlogList from './components/pages/Admin/BlogsList';
import FeedbackList from './components/pages/Admin/FeedBackList';
import SpaDashboard from './components/pages/Admin/SpaDashboard';
import QuizList from './components/pages/Admin/Quizs/QuizList';
import QuizDetail from './components/pages/Admin/Quizs/QuizDetail';
import RecommendService from './components/pages/Admin/Quizs/RecommentService'
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
                    <Route path="/admin/quizlist" element={<QuizList />} />
                    <Route path="/admin/quizlist/:id" element={<QuizDetail />} />
                    <Route path="/admin/recommend-service" element={<RecommendService />} />
                </Routes>
            </UserProvider>
        </Router>
    );

}

export default App;
