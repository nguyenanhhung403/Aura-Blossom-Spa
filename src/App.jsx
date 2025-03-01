import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import './App.css';
import Register from './components/Register';
import Home from './pages/Home';
import ForgottenPW from './components/ForgottenPW';
function App() {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<ForgottenPW />} />
                </Routes>
            </UserProvider>
        </Router>
    );
}
export default App;