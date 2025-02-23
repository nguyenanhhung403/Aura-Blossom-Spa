import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import QuizSection from './QuizSection';
import CTASection from './CTASection';
import StaffSection from './StaffSection';
import FeedbackSection from './FeedbackSection';
import Footer from './Footer';

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