import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from '../images/AnhSuMenh/SuMenh.jpg';
import heroImage1 from '../images/AnhSuMenh/SuMenh2.jpg';
import heroImage2 from '../images/AnhSuMenh/SuMenh3.jpg';

const images = [heroImage, heroImage1, heroImage2];
const HeroSection = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentImage}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ 
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.4 }
                    }}
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${images[currentImage]})` }}
                />
            </AnimatePresence>

            <div className="absolute inset-0 gradient-overlay" />

            <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-light)] leading-tight">
                        <span className="block mb-4">Tỏa sáng như hoa</span>
                        <span className="text-3xl md:text-4xl font-normal italic block">
                            Vẻ đẹp nở rộ theo thời gian
                        </span>
                    </h1>
                    
                    <motion.p
                        className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        Trải nghiệm dịch vụ spa đẳng cấp 5 sao cùng đội ngũ chuyên gia hàng đầu
                    </motion.p>

                    <motion.button
                        className="button-hover-effect px-8 py-4 bg-[var(--primary-color)] text-[var(--text-light)] rounded-full font-semibold relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">Đặt lịch ngay</span>
                        <motion.div
                            className="absolute inset-0 bg-[var(--secondary-color)] rounded-full"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
