import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface ComingSoonProps {
  pageName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageName }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-24 pb-12">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#22BBE0]/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A046B4]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="animate-fade-in space-y-6 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-xl">
              {pageName}
            </h1>
            
            <div className="flex items-center justify-center gap-4 my-6 opacity-80">
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#A046B4]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#A046B4] shadow-[0_0_12px_#A046B4]"></div>
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#A046B4]"></div>
            </div>

            <p className="text-xl md:text-2xl font-medium text-white/80 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
              The <span className="text-[#22BBE0] font-bold">{pageName}</span> page will be updated soon.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
