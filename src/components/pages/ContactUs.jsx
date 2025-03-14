import React from "react";
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
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer   className="bg-[#2F4F4F] text-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FaLeaf className="mr-2 text-green-400" />
              Aura Blossom Spa
            </h3>
            <p className="text-sm mb-4">
              Mang đến những trải nghiệm spa đẳng cấp, giúp bạn thư giãn và tìm lại
              cân bằng trong cuộc sống.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
              >
                <FaYoutube />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Column 2 - Contact */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-green-400 mr-3 mt-1" />
                <span>09 Đường Tam Bình, Phường Hiệp Bình Chánh, Thủ Đức</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-green-400 mr-3" />
                <span>0879487855</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-green-400 mr-3" />
                <span>ht79247@gmail.com</span>
              </li>
              <li className="flex items-center">
                <FaClock className="text-green-400 mr-3" />
                <span>9h - 22h hàng ngày</span>
              </li>
              <li className="flex items-center">
                <FaGlobe className="text-green-400 mr-3" />
                <a
                  href="https://aurablossomspa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  aurablossomspa.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Map */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Vị Trí</h3>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5154766487393!2d106.72121867597638!3d10.846988489301394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752735b340d1c1%3A0x6d881733f6c63b9e!2zMDkgVGFtIELDrG5oLCBIaeG7h3AgQsOsbmggQ2jDoW5oLCBUaOG7pyDEkOG7qWMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1710320156441!5m2!1svi!2s"
                className="w-full h-48 border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Đăng Ký Nhận Tin</h3>
            <p className="mb-4 text-sm">
              Nhận thông tin về ưu đãi và dịch vụ mới nhất từ Aura Blossom Spa.
            </p>
            <Link to="/register">
              <button className="w-full bg-green-400 text-gray-900 py-2 rounded hover:bg-green-500 transition-colors">
                Đăng Ký
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {currentYear} Aura Blossom Spa. Tất cả các quyền được bảo lưu.</p>
          <div className="mt-2 md:mt-0">
            {/* Bạn có thể thêm link Điều Khoản, Chính Sách nếu cần */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
