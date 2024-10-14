import React from 'react';
import backgroundImage from '../assets/bg-6.webp';

const ContactUs: React.FC = () => {
  return (
    <section id="contact-us" className="relative" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="absolute inset-0 bg-white bg-opacity-40 "></div>
      <div className="relative py-16 px-4 mx-auto max-w-screen-xl">
        <div className="max-w-screen-md mb-8 lg:mb-16 items-center justify-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Contact Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Email Us</h3>
            <p className="text-gray-600 dark:text-gray-400">Reach out to us directly via email.</p>
            <a href="mailto:cryptoutils@gmail.com" className="inline-flex items-center mt-4 text-blue-600 hover:underline">
              Send an email
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
            </a>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Join Our Telegram Group</h3>
            <p className="text-gray-600 dark:text-gray-400">Connect with us and other users on Telegram.</p>
            <a href="https://t.me/cryptoutils" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-4 text-blue-600 hover:underline">
              Join Telegram group
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
