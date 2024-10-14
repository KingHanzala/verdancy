import React from 'react';
import { featuresList } from '../utils/content';
import backgroundImage from '../assets/cool-background.png';

const Features: React.FC = () => {
  return (
    <section id="key-features" className="relative">
      <div className="absolute inset-0 animate-scroll-background">
          <div 
              className="absolute inset-0 bg-repeat"
              style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: '200% 200%',
                  transform: 'scaleY(-1)'
              }}
          ></div>
      </div>
      <div className="absolute inset-0 bg-white bg-opacity-30"></div>
      <div className="relative py-16 px-4 mx-auto max-w-screen-xl">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Key Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <img src={feature.icon} alt={`${feature.title} icon`} className="w-10 h-10 lg:w-12 lg:h-12" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
