import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/cool-background.svg';

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const handleCreatePoll = () => {
        navigate('/create-poll');
    };
    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 animate-scroll-background">
                <div 
                    className="absolute inset-0 bg-repeat"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: '100% 100%',
                        transform: 'scaleX(-1)'
                    }}
                ></div>
            </div>
            <div className="absolute inset-0 bg-white bg-opacity-70"></div>
            <main className="relative text-center px-4 py-16 max-w-4xl mx-auto">
                <div className="flex justify-center">
                    <a className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 focus:outline-none focus:border-gray-300" href="https://forms.gle/gBtcErpaovVtqp8MA" target="_blank" rel="noopener noreferrer">
                        Get Early Access
                        <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </span>
                    </a>
                </div>
                <header className="animate-fadeInDown mb-8 pt-10">
                    <h1 className="text-5xl font-bold text-gray-900 text-center">Make Decisions Onchain</h1>
                </header>
                <p className="text-xl text-gray-800 mb-8">
                    Accurate and balanced decisions powered by blockchain technology
                </p>
                <div className="space-x-4 pt-5">
                    <button
                        onClick={handleCreatePoll}
                        className="btn btn-primary"
                    >
                        Launch App
                    </button>
                </div>
            </main>
        </section>
    );
};

export default Hero;
