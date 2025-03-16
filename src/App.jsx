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
}

export default App;
