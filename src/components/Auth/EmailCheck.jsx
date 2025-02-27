import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import imageUrl from '../../images/template/CheckEmail.jpg';

const EmailCheck = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = () => {
    setIsCodeSent(true);
  };

  const handleVerifyCode = () => {
    if (verificationCode === '123456') { 
      setIsCodeVerified(true);
      navigate('/forgot');
    } else {
      alert('Mã xác nhận không đúng');
    }
  };

  return (
    <div className="flex min-h-screen h-screen">
      <div className="w-1/2 relative">
        <img src={imageUrl} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-[#1B4033]">
        <motion.div
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Kiểm tra Email</h2>
          <form>
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>

            {isCodeSent && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block text-gray-700 mb-2" htmlFor="verification-code">
                  Mã xác nhận
                </label>
                <input
                  type="text"
                  id="verification-code"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Nhập mã xác nhận"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </motion.div>
            )}

            {!isCodeSent ? (
              <motion.button
                type="button"
                className="w-full bg-[#446E6A] text-white py-2 rounded hover:bg-[#375955] transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onClick={handleSendCode}
              >
                Gửi mã
              </motion.button>
            ) : (
              <motion.button
                type="button"
                className="w-full bg-[#446E6A] text-white py-2 rounded hover:bg-[#375955] transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onClick={handleVerifyCode}
              >
                Tiếp tục
              </motion.button>
            )}
          </form>

          <motion.p
            className="mt-4 text-center text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link to="/login" className="text-[#446E6A] hover:underline">
              Đăng nhập
            </Link>
          </motion.p>
          <motion.p
            className="mt-4 text-center text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link to="/" className="text-[#446E6A] hover:underline">
              Trở về trang chủ
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailCheck;