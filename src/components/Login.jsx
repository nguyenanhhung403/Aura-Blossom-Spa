import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#446E6A] text-white py-2 rounded hover:bg-[#375955] transition"
                    >
                        Đăng nhập
                    </button>
                </form>
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition mt-4"
                >
                    Đăng nhập với Google
                </button>
                <p className="mt-4 text-center">
                    Chưa có tài khoản? <Link to="/register" className="text-[#446E6A] hover:underline">Đăng ký</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;