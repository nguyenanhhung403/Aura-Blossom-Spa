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
import ServiceDetail from "./components/pages/ServiceDetail";
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
import Reports from './components/pages/Admin/SpaDashboard';
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
    return <Navigate to="/" replace />;
  }

  return children;
};

// Protected Route Component cho Admin
const ProtectedAdminRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  
  // Kiểm tra xem người dùng có role ADMIN không
  const hasAdminAccess = () => {
    if (!user || !user.role) return false;
    return user.role.some(role => role.name === "ADMIN");
  };

  // Nếu không đăng nhập hoặc không có quyền admin, chuyển hướng về trang login
  if (!user || !hasAdminAccess()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Protected Route Component cho Therapist
const ProtectedTherapistRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  
  // Kiểm tra xem người dùng có role THERAPIST không
  const hasTherapistAccess = () => {
    if (!user || !user.role) return false;
    return user.role.some(role => role.name === "THERAPIST");
  };

  // Nếu không đăng nhập hoặc không có quyền therapist, chuyển hướng về trang login
  if (!user || !hasTherapistAccess()) {
    return <Navigate to="/" replace />;
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
                    <Route path="/service-detail/:id" element={<ServiceDetail />} />

                    {/* Admin Routes */}
                    <Route path="/admin/*" element={
                      <ProtectedAdminRoute>
                        <AdminDashboard />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/services" element={
                      <ProtectedAdminRoute>
                        <ServiceManagement />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/appointments" element={
                      <ProtectedAdminRoute>
                        <AppointmentManagement />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/therapists" element={
                      <ProtectedAdminRoute>
                        <TherapistManagement />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/customers" element={
                      <ProtectedAdminRoute>
                        <CustomerList />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/schedules" element={
                      <ProtectedAdminRoute>
                        <Schedule />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/blogs" element={
                      <ProtectedAdminRoute>
                        <BlogList />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/feedback" element={
                      <ProtectedAdminRoute>
                        <FeedbackList />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/dashboard" element={
                      <ProtectedAdminRoute>
                        <SpaDashboard />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/quizlist" element={
                      <ProtectedAdminRoute>
                        <QuizList />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/quizlist/:id" element={
                      <ProtectedAdminRoute>
                        <QuizDetail />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/recommend-service" element={
                      <ProtectedAdminRoute>
                        <RecommendService />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/admin/reports" element={
                      <ProtectedAdminRoute>
                        <Reports />
                      </ProtectedAdminRoute>
                    } />
                    
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
                    <Route path="/therapist2" element={
                      <ProtectedTherapistRoute>
                        <TherapistLayout />
                      </ProtectedTherapistRoute>
                    }>
                        <Route index element={<TherapistDashboard />} />
                        <Route path="schedule" element={<TherapistSchedule />} />
                        <Route path="settings" element={<TherapistSettings />} />
                    </Route>

                    {/* Thêm route cho trang chi tiết dịch vụ */}
                    <Route path="/services/:id" element={<ServiceDetail />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
