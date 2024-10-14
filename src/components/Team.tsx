import React from 'react';

const Team: React.FC = () => {
  return (
    <div>
      {/* Your existing team component content */}
      
      <footer className="text-center mt-8 text-sm text-gray-500">
        Built by <a 
          href="https://x.com/kinghanzala_" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Hanzala
        </a> with ❤️
      </footer>
    </div>
  );
};

export default Team;
