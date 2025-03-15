import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Navbar from './Navbar';
import HeroSection from './Sections/HeroSection';
import AboutSection from './Sections/AboutSection';
import ServicesSection from './Sections/ServicesSection';
import QuizSection from './Sections/QuizSection';
// import CTASection from './Sections/CTASection';
import StaffSection from './Sections/StaffSection';
import FeedbackSection from './Sections/FeedbackSection';
import Footer from './Footer';
import ContactUs from './ContactUs';
import ExpertStandards from "./Sections/ExpertStandards"
import CustomerFavorites from "./Sections/CustomerFavorites"
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
                {/* <CTASection /> */}
                <CustomerFavorites/>
                <ExpertStandards/>
                <StaffSection />
                <FeedbackSection />
                <ContactUs />
                {/* <QuizSection /> */}
            </main>
            <Footer />
        </div>
    );
};

export default Home;