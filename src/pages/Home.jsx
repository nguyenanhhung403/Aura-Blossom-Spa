import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Navbar from './Navbar';
import HeroSection from './Sections/HeroSection';
import AboutSection from './Sections/AboutSection';
import ServicesSection from './Sections/ServicesSection';
import QuizSection from './Sections/QuizSection';
import CTASection from './Sections/CTASection';
import StaffSection from './Sections/StaffSection';
import FeedbackSection from './Sections/FeedbackSection';
import Footer from './Footer';
import ContactUs from './ContactUs';

const Home = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="w-full overflow-hidden">
            <Navbar />
            <main>
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <QuizSection />
                <CTASection />
                <StaffSection />
                <FeedbackSection />
                <ContactUs />
                {user && (
                    <div className="text-center mt-4">
                        <h2 className="text-2xl font-bold">Welcome, {user.displayName}!</h2>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Home;