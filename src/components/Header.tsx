import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaLock } from 'react-icons/fa';
import Cookies from 'js-cookie';
import logo from '../assets/logo.png';
import { useAppKitAccount } from "@reown/appkit/react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Header: React.FC = () => {
  const location = useLocation();
  const [_walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('color-theme') === 'dark';
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // New state for dropdown
  const [_showComingSoon, setShowComingSoon] = useState(false);
  const [showDashboardComingSoon, _setShowDashboardComingSoon] = useState(false);

  const { address, isConnected } = useAppKitAccount();

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
      Cookies.set('walletAddress', address, { expires: 7 });
    }
    if(!isConnected){
      setWalletAddress(null);
      Cookies.remove('walletAddress');
    }
  }, [address]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
    localStorage.setItem('color-theme', newTheme);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 shadow-md z-50">
      <div className="bg-white dark:bg-gray-900">
        <nav className="px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://cryptoutils.xyz" className="flex items-center" target="_blank" rel="noopener noreferrer">
              <img src={logo} className="mr-3 h-6 sm:h-9" alt="CryptoUtils Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Verdancy</span>
            </a>
            <div className="flex items-center lg:order-2">
              {!isHomePage && (
                <button
                  onClick={toggleTheme}
                  className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded ml-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
                >
                  {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>
              )}
              {/* Connect/Disconnect button for larger screens */}
              <div className="hidden lg:block ml-2">
                <w3m-button/>
              </div>
              <button
                onClick={toggleDropdown}
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded={isDropdownOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg className={`w-6 h-6 ${isDropdownOpen ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                <svg className={`w-6 h-6 ${isDropdownOpen ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <div className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${isDropdownOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {isHomePage ? (
                  <>
                    <li>
                      <a
                        href="#hero"
                        onClick={(e) => handleSmoothScroll(e, 'hero')}
                        className="flex items-center py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#key-features"
                        onClick={(e) => handleSmoothScroll(e, 'key-features')}
                        className="flex items-center py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                      >
                        Key Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact-us"
                        onClick={(e) => handleSmoothScroll(e, 'contact-us')}
                        className="flex items-center py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li className="relative">
                      <Link
                        to="/polls"
                        className="flex items-center py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                      >
                        Polls
                      </Link>
                    </li>
                    <li className="relative">
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        onMouseEnter={() => setShowComingSoon(true)}
                        onMouseLeave={() => setShowComingSoon(false)}
                        className="flex items-center py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                      >
                        <FaLock className="mr-2" /> Dashboard
                      </a>
                      {showDashboardComingSoon && (
                        <div className="absolute top-full left-0 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                          Coming soon
                        </div>
                      )}
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/"
                        className="flex items-center py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="relative">
                      <Link
                        to="/polls"
                        className="flex items-center py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                      >
                        Polls
                      </Link>
                    </li>
                  </>
                )}
                {/* Connect/Disconnect button for smaller screens */}
                <li className="lg:hidden mt-4">
                  <w3m-button />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
