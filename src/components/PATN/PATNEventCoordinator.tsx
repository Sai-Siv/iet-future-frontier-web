import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { User, Phone, Clock, Mail } from 'lucide-react';

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

        <div className="pl-2 md:pl-9 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="coordinator-item flex gap-2">
            <h3 className="text-lg md:text-xl font-bold mb-2">1.</h3>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Ms. Leela Bhargavi</h3>
              <div className="text-white/80 space-y-1 text-sm md:text-base">
                <p>YP Member IET HLN</p>
              </div>
            </div>
          </div>
          <div className="coordinator-item flex gap-2">
            <h3 className="text-lg md:text-xl font-bold mb-2">2.</h3>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Ms. M Hemalatha</h3>
              <div className="text-white/80 space-y-1 text-sm md:text-base">
                <p>YP Member IET HLN</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center border-t border-white/10 pt-8">
          <p className="text-white/90 text-lg md:text-xl flex flex-wrap items-center justify-center gap-2">
            For more details, contact:
            <a href="tel:+916302016121" className="flex items-center gap-2 text-[#22BBE0] font-semibold hover:underline ml-1">
              <Phone className="w-5 h-5" />
              +91 63020 16121
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PATNEventCoordinator;
