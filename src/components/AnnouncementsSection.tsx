import React from 'react';
import { Bell, Calendar, Trophy, Mic } from 'lucide-react';

const AnnouncementsSection = () => {
  const announcements = [
    { id: 1, icon: <Bell className="w-4 h-4 text-[#A046B4]" />, text: "Registration is now open!" },
    { id: 2, icon: <Calendar className="w-4 h-4 text-[#22BBE0]" />, text: "Agenda will be released soon" },
    { id: 3, icon: <Trophy className="w-4 h-4 text-[#AAC81E]" />, text: "Awards nominations are live" },
    { id: 4, icon: <Mic className="w-4 h-4 text-[#EE7520]" />, text: "Keynote speakers to be announced" },
  ];

  // Duplicate items 3 times to ensure a completely seamless infinite loop
  const marqueeItems = [...announcements, ...announcements, ...announcements];

  return (
    <section className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 mb-12">
      <div className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden flex items-center h-12 sm:h-14">
        
        {/* 'Latest News' Badge on the left */}
        <div className="z-10 bg-gradient-to-r from-[#A046B4] to-[#53274E] h-full px-4 sm:px-6 flex items-center justify-center font-bold text-white tracking-wide text-xs sm:text-sm whitespace-nowrap shadow-[4px_0_15px_rgba(0,0,0,0.5)]">
          <div className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </div>
          LATEST NEWS
        </div>
        
        {/* Scrolling Ticker */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          {/* Gradient fade on the right side to smooth the edge */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
            {marqueeItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center mx-6 sm:mx-8 space-x-3 cursor-pointer group">
                <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {item.text}
                </span>
                <span className="ml-6 sm:ml-8 text-white/20">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AnnouncementsSection;
