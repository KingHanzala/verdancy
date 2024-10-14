import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Hero from './Hero';
import Features from './Features';
import ContactUs from './ContactUs';
import FAQ from './FAQ';
const Home: React.FC = () => {
    useEffect(() => {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    }, []);

    return (
        <div className="bg-gray-100">
            <Hero />
            <Features />
            <ContactUs />
            <FAQ/>
        </div>
    );
};

export default Home;
