import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer  className="bg-[#2F4F4F] text-white py-8 animate__animated animate__fadeInUp animate__delay-2s">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between">
                <div className="mb-4 md:mb-0">
                    <h3 className="font-bold text-2xl">Aura Blossom Spa</h3>
                    <p className="text-lg text-gray-200">
                        © {new Date().getFullYear()} Aura Blossom. All rights reserved.
                    </p>
                    <div className="flex flex-col space-y-2 text-lg mb-4 md:mb-0">
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faPhone} />
                        <span>+84 123 456 789</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span>info@aurablossomspa.com</span>
                    </div>
                </div>
                </div>
                <div className="flex space-x-4 text-lg mb-4 md:mb-0">
                    <a href="#home" className="hover:text-gray-300">Trang chủ</a>
                    <a href="#about" className="hover:text-gray-300">Giới thiệu</a>
                    <a href="#services" className="hover:text-gray-300">Dịch vụ</a>
                    <a href="#staff" className="hover:text-gray-300">Chuyên viên</a>
                    <a href="#feedback" className="hover:text-gray-300">Feedback</a>
                </div>
                <div className="flex space-x-4 text-lg">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;