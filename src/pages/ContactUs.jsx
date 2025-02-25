import React from 'react';
import { motion } from 'framer-motion';
// Dùng React Icons
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa';

const ContactSection = () => {
  return (
    <div id="contact"className="min-h-screen bg-[#1B4033] flex items-center justify-center p-4">
      {/* Container chính với hiệu ứng fade-in */}
      <motion.div
        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Cột trái: Form liên hệ (slide từ trái sang) */}
        <motion.div
          className="bg-[#c9d6d2] rounded-lg p-6 md:p-8 shadow-md"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-[#1B4033]">
            Liên hệ với chúng tôi
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-[#1B4033] mb-2" htmlFor="name">
                Họ và Tên
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#446E6A]"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#1B4033] mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#446E6A]"
                placeholder="Nhập email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#1B4033] mb-2" htmlFor="phone">
                Số điện thoại
              </label>
              <input
                type="text"
                id="phone"
                className="w-full p-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#446E6A]"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="mb-6">
              <label className="block text-[#1B4033] mb-2" htmlFor="message">
                Lời nhắn
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#446E6A]"
                placeholder="Nhập lời nhắn"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[#446E6A] text-white font-bold rounded hover:bg-[#375955] transition"
            >
              Gửi
            </button>
          </form>
        </motion.div>

        
        <motion.div
          className="bg-[#c9d6d2] rounded-lg p-6 md:p-8 shadow-md flex flex-col justify-between"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Google_Maps_Logo_2020.svg"
              alt="Map"
              className="w-12 h-auto mb-4"
            />
            <iframe
              title="Google Map"
              src="https://maps.google.com/maps?width=600&height=400&hl=en&q=09%20%C4%90%C6%B0%E1%BB%9Dng%20Tam%20B%C3%ACnh%2C%20Ph%C6%B0%E1%BB%9Dng%20Hi%E1%BB%87p%20B%C3%ACnh%20Ch%C3%A1nh%2C%20TP.Th%E1%BB%A7%20%C4%90%E1%BB%A9c%20&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-64 border-0 rounded mt-2"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          
          <div className="text-[#1B4033] mb-6">
            <p className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2" />
              09 Đường Tam Bình, Phường Hiệp Bình Chánh, Thủ Đức
            </p>
            <p className="flex items-center mb-2">
              <FaPhoneAlt className="mr-2" />
              0879487855
            </p>
            <p className="flex items-center mb-2">
              <FaEnvelope className="mr-2" />
              ht79247@gmail.com
            </p>
            <p className="mb-2">9h - 22h hằng ngày</p>
            <p className="mb-2">
              <a
                href="https://aurablossomspa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#375955]"
              >
                https://aurablossomspa.com
              </a>
            </p>
          </div>

          {/* Mạng xã hội */}
          <div className="flex items-center gap-4 justify-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1B4033] hover:text-[#375955] text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1B4033] hover:text-[#375955] text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1B4033] hover:text-[#375955] text-xl"
            >
              <FaYoutube />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1B4033] hover:text-[#375955] text-xl"
            >
              <FaTiktok />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactSection;
