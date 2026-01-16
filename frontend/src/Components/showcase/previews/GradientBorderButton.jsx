import React from 'react';

const GradientBorderButton = () => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center">
        <span className="text-white font-bold">Gradient Border</span>
      </button>
      <style>{`
        @keyframes tilt {
          0%, 50%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default GradientBorderButton;
