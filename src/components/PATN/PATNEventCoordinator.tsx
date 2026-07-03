import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { User, Phone, Clock } from 'lucide-react';

const PATNEventCoordinator = () => {
  useEffect(() => {
    ScrollReveal().reveal('.coordinator-container', {
      origin: 'bottom',
      distance: '30px',
      duration: 800,
      easing: 'ease-out',
    });
  }, []);

  return (
    <section className="coordinator-container py-8 px-4 md:px-8 max-w-4xl mx-auto text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="coordinator-header text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide drop-shadow-md">
            Event Coordinators
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            For any queries related to Present Around The Network (PATN)
          </p>
        </div>

      <div className="pl-2 md:pl-9 space-y-8">
        <div className="coordinator-item">
          <h3 className="text-lg md:text-xl font-bold mb-2">1. Ms. Leela Bhargavi</h3>
          <div className="text-white/80 space-y-1 text-sm md:text-base">
            <p>YP Member & PATN 2026 Coordinator</p>
            <p>IET HLN</p>
            <div className="pt-2 flex flex-col space-y-2">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#22BBE0]" /> +91 97057 28615</p>
              <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#22BBE0]" /> 6:00 PM to 8:00 PM</p>
            </div>
          </div>
        </div>
        {/* You can add more coordinators here in the future in the same format */}
      </div>
      </div>
    </section>
  );
};

export default PATNEventCoordinator;
