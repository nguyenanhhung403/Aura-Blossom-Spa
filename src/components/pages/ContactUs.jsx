import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaClock,
  FaGlobe,
  FaLeaf,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Lưu email vào localStorage để Register.jsx có thể sử dụng
      localStorage.setItem("registrationEmail", email);
      // Chuyển hướng đến trang đăng ký
      navigate("/register");
    }
  };

  return (
    <footer className="aura-footer bg-gradient-to-b from-[#2F4F4F] to-[#1a2e2e] text-gray-100 px-[30px] pt-[30px]">
      {/* Main Footer Content */}
      <div className="aura-footer-container container mx-auto px-[30px] py-12">
        <div className="aura-footer-grid grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - About */}
          <div className="aura-footer-col transform hover:scale-105 transition-transform duration-300">
            <h3 className="aura-footer-title text-2xl font-bold mb-5 flex items-center text-green-300" style={{fontFamily: 'inherit'}}>
              <FaLeaf className="mr-2 text-green-400" />
              Aura Blossom Spa
            </h3>
            <p className="aura-footer-text text-sm mb-6 leading-relaxed text-gray-300">
              Mang đến những trải nghiệm spa đẳng cấp, giúp bạn thư giãn và tìm lại
              cân bằng trong cuộc sống.
            </p>
            <div className="aura-social-icons flex space-x-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aura-social-icon text-xl hover:text-green-400 transition-colors transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aura-social-icon text-xl hover:text-green-400 transition-colors transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aura-social-icon text-xl hover:text-green-400 transition-colors transform hover:scale-110"
                aria-label="Youtube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aura-social-icon text-xl hover:text-green-400 transition-colors transform hover:scale-110"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Column 2 - Contact */}
          <div className="aura-footer-col transform hover:scale-105 transition-transform duration-300">
            <h3 className="aura-footer-title text-2xl font-bold mb-5 text-green-300" style={{fontFamily: 'inherit'}}>Liên Hệ</h3>
            <ul className="aura-contact-list space-y-4">
              <li className="aura-contact-item flex items-start group">
                <FaMapMarkerAlt className="aura-icon text-green-400 mr-3 mt-1 group-hover:text-green-300 transition-colors" />
                <span className="aura-contact-text text-gray-300 group-hover:text-white transition-colors">09 Đường Tam Bình, Phường Hiệp Bình Chánh, Thủ Đức</span>
              </li>
              <li className="aura-contact-item flex items-center group">
                <FaPhoneAlt className="aura-icon text-green-400 mr-3 group-hover:text-green-300 transition-colors" />
                <a href="tel:0879487855" className="aura-contact-link text-gray-300 group-hover:text-white transition-colors">0879487855</a>
              </li>
              <li className="aura-contact-item flex items-center group">
                <FaEnvelope className="aura-icon text-green-400 mr-3 group-hover:text-green-300 transition-colors" />
                <a href="mailto:ht79247@gmail.com" className="aura-contact-link text-gray-300 group-hover:text-white transition-colors">ht79247@gmail.com</a>
              </li>
              <li className="aura-contact-item flex items-center group">
                <FaClock className="aura-icon text-green-400 mr-3 group-hover:text-green-300 transition-colors" />
                <span className="aura-contact-text text-gray-300 group-hover:text-white transition-colors">9h - 22h hàng ngày</span>
              </li>
              <li className="aura-contact-item flex items-center group">
                <FaGlobe className="aura-icon text-green-400 mr-3 group-hover:text-green-300 transition-colors" />
                <a
                  href="https://aurablossomspa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aura-contact-link text-gray-300 hover:text-green-300 transition-colors"
                >
                  aurablossomspa.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Map */}
          <div className="aura-footer-col transform hover:scale-105 transition-transform duration-300">
            <h3 className="aura-footer-title text-2xl font-bold mb-5 text-green-300" style={{fontFamily: 'inherit'}}>Vị Trí</h3>
            <div className="aura-map-container overflow-hidden rounded-lg shadow-lg border-2 border-green-400/30 hover:border-green-400 transition-colors">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5154766487393!2d106.72121867597638!3d10.846988489301394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752735b340d1c1%3A0x6d881733f6c63b9e!2zMDkgVGFtIELDrG5oLCBIaeG7h3AgQsOsbmggQ2jDoW5oLCBUaOG7pyDEkOG7qWMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1710320156441!5m2!1svi!2s"
                className="w-full h-56 border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="aura-footer-col transform hover:scale-105 transition-transform duration-300">
            <h3 className="aura-footer-title text-2xl font-bold mb-5 text-green-300" style={{fontFamily: 'inherit'}}>Đăng Ký Nhận Tin</h3>
            <p className="aura-footer-text mb-5 text-sm text-gray-300 leading-relaxed">
              Nhận thông tin về ưu đãi và dịch vụ mới nhất từ Aura Blossom Spa.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <div className="aura-input-container mb-4">
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="aura-input w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit"
                className="aura-btn w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors transform hover:scale-105 font-medium"
              >
                Đăng Ký Ngay
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="aura-footer-copyright bg-[#1a2e2e] py-6 border-t border-gray-700">
        <div className="container mx-auto px-[30px] flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="aura-copyright-text text-gray-400">© {currentYear} Aura Blossom Spa. Tất cả các quyền được bảo lưu.</p>
          <div className="aura-footer-links mt-3 md:mt-0 flex space-x-4 text-gray-400">
            <a href="#" className="aura-footer-link hover:text-green-400 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="aura-footer-link hover:text-green-400 transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
