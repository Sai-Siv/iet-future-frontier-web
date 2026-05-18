
import React from 'react';

const FloatingHelpButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
        <span className="text-xl">💬</span>
      </button>
    </div>
  );
};

export default FloatingHelpButton;
