import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from './components/context/UserContext';
import { UserContext } from './components/context/UserContext';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/pages/Home';
import ForgottenPW from './components/Auth/ForgottenPW';
import Blog from './components/pages/Blogs';
import EmailCheck from './components/Auth/EmailCheck';
import Profile from './components/pages/Profile';
import BookingProcess from './components/pages/BookingProcess';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import ServiceManagement from "./components/pages/Admin/ServiceManagement";
import AppointmentManagement from "./components/pages/Admin/AppointmentManagement";
import TherapistManagement from "./components/pages/Admin/TherapistManagement";
import CustomerList from './components/pages/Admin/CustomerList'; 
import Schedule from './components/pages/Admin/Schedules';
import BlogList from './components/pages/Admin/BlogsList';
import FeedbackList from './components/pages/Admin/FeedBackList';
import SpaDashboard from './components/pages/Admin/SpaDashboard';
import QuizList from './components/pages/Admin/Quizs/QuizList';
import QuizDetail from './components/pages/Admin/Quizs/QuizDetail';
import RecommendService from './components/pages/Admin/Quizs/RecommentService'
import ServicesTable from './components/pages/Services';
import RateService from './components/pages/RateService';
import ViewFeedbacks from './components/pages/ViewFeedbacks';
import Quiz from './components/pages/Quiz';
import History from './components/pages/History';
import Therapist from './components/pages/Therapist';
// Import staff components
import StaffLayout from './components/staff/StaffLayout';
import StaffDashboard from './components/staff/StaffDashboard';
import StaffAppointments from './components/staff/StaffAppointments';
import StaffHistory from './components/staff/StaffHistory';
import StaffFeedback from './components/staff/StaffFeedback';
import StaffSettings from './components/staff/StaffSettings';
// Import therapist2 components
import TherapistDashboard from './components/pages/therapist2/therapistDashboard';
import TherapistLayout from './components/pages/therapist2/therapistLayout';
//import TherapistAppointments from './components/pages/therapist2/therapistAppoiment';
import TherapistSettings from './components/pages/therapist2/therapistSetting';
import TherapistSchedule from './components/pages/therapist2/therapistSchedule';

// Protected Route Component cho Staff
const ProtectedStaffRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  
  // Kiểm tra xem người dùng có role STAFF không
  const hasStaffAccess = () => {
    if (!user || !user.role) return false;
    return user.role.some(role => role.name === "STAFF");
  };

  // Nếu không đăng nhập hoặc không có quyền staff, chuyển hướng về trang login
  if (!user || !hasStaffAccess()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
    return (
        <BrowserRouter>
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
                    <Route path="/services" element={<ServicesTable />} />
                    <Route path="/rate-service" element={<RateService />} />
                    <Route path="/view-feedbacks" element={<ViewFeedbacks />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path='/history' element={<History/>}/>
                    <Route path='/therapist' element={<Therapist/>}/>

                    {/* Admin Routes */}
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/admin/services" element={<ServiceManagement />} />
                    <Route path="/admin/appointments" element={<AppointmentManagement />} />
                    <Route path="/admin/therapists" element={<TherapistManagement />} />
                    <Route path="/admin/customers" element={<CustomerList />} />
                    <Route path="/admin/schedules" element={<Schedule />} />
                    <Route path="/admin/blogs" element={<BlogList />} />
                    <Route path="/admin/feedback" element={<FeedbackList />} />
                    <Route path="/admin/dashboard" element={<SpaDashboard />} />
                    <Route path="/admin/quizlist" element={<QuizList />} />
                    <Route path="/admin/quizlist/:id" element={<QuizDetail />} />
                    <Route path="/admin/recommend-service" element={<RecommendService />} />
                    
                    {/* Staff Routes - Được bảo vệ bởi ProtectedStaffRoute */}
                    <Route path="/staff" element={
                      <ProtectedStaffRoute>
                        <StaffLayout />
                      </ProtectedStaffRoute>
                    }>
                        <Route index element={<StaffDashboard />} />
                        <Route path="appointments" element={<StaffAppointments />} />
                        <Route path="history" element={<StaffHistory />} />
                        <Route path="feedback" element={<StaffFeedback />} />
                        <Route path="settings" element={<StaffSettings />} />
                    </Route>
                    {/* therapist 2 routes */}
                    <Route path="/therapist2" element={<TherapistLayout  />} >
                    
                        <Route index element={<TherapistDashboard />} />
                        <Route path="schedule" element={<TherapistSchedule />} />
                        <Route path="settings" element={<TherapistSettings />} />
                    </Route>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
