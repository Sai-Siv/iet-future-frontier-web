import React from 'react';
import { Star, Users, ChevronDown, Calendar, MapPin, Lightbulb, Leaf, Cpu, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative flex flex-col items-center justify-center overflow-hidden bg-black pt-4 pb-10 md:pt-8 md:pb-16 lg:pt-6 lg:pb-20">
      {/* Background with subtle star-like dots & single purple glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated stars/dots effect */}
        <div className="absolute inset-0">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>

        {/* Cohesive Ambient Purple Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#A046B4]/15 rounded-full blur-[130px]"></div>
        <div className="absolute top-24 left-16 w-2 h-2 bg-[#A046B4] rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-24 right-16 w-2 h-2 bg-[#A046B4] rounded-full blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-screen-xl mx-auto">
        <div className="animate-fade-in space-y-4">
          <div>
            {/* Top badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 bg-[#A046B4]/10 backdrop-blur-xl border border-[#A046B4]/25 rounded-full px-4 py-1.5 hover:border-[#A046B4]/40 transition-all duration-300">
                <span className="inline-block w-2 h-2 rounded-full bg-[#A046B4] animate-ping"></span>
                <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                  Registration Open &bull; 4 &amp; 5 December 2026
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-full px-3 py-1.5 text-xs text-white/80">
                <span>International Volunteer Day</span>
              </div>
            </div>

            {/* Organizers Section */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-2 max-w-fit mx-auto transition-colors">
              <h2 className="text-xs sm:text-sm font-bold text-white/90 tracking-wider uppercase drop-shadow-md">
                IET Hyderabad Local Network
              </h2>
              <span className="text-white/30 hidden sm:inline">&bull;</span>
              <h2 className="text-xs sm:text-sm font-bold text-white/90 tracking-wider uppercase drop-shadow-md">
                VIT-AP University
              </h2>
            </div>

            {/* Main Title - IET 360° in the SAME LINE with 4 IET-colored rotating arrows */}
            <div className="my-4 flex flex-col items-center justify-center select-none group/emblem cursor-pointer">
              
              {/* Horizontal Same-Line Container for IET 360° */}
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 transition-transform duration-500 group-hover/emblem:scale-[1.03]">
                {/* IET */}
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight drop-shadow-[0_4px_25px_rgba(255,255,255,0.3)]">
                  IET
                </span>

                {/* 360° inside 4-Arrow Rotating Circle */}
                <div className="relative flex items-center justify-center w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 aspect-square">
                  {/* Multi-color ambient background glow */}
                  <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#A046B4]/25 via-[#22BBE0]/20 to-[#AAC81E]/20 blur-2xl pointer-events-none group-hover/emblem:opacity-100 transition-opacity duration-500"></div>

                  {/* 4 Colored IET Arrows Rotating in a Mathematically Flawless Circle */}
                  <div className="w-full h-full absolute inset-0 rotating-circle-flawless pointer-events-none">
                    <svg
                      viewBox="0 0 320 320"
                      className="w-full h-full"
                    >
                      <defs>
                        <filter id="glowGreen" x="-30%" y="-30%" width="160%" height="160%">
                          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#AAC81E" floodOpacity="0.7" />
                        </filter>
                        <filter id="glowCyan" x="-30%" y="-30%" width="160%" height="160%">
                          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22BBE0" floodOpacity="0.7" />
                        </filter>
                        <filter id="glowPurple" x="-30%" y="-30%" width="160%" height="160%">
                          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#A046B4" floodOpacity="0.7" />
                        </filter>
                        <filter id="glowOrange" x="-30%" y="-30%" width="160%" height="160%">
                          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#EE7520" floodOpacity="0.7" />
                        </filter>
                      </defs>

                      {/* Concentric subtle guide tracks */}
                      <circle
                        cx="160"
                        cy="160"
                        r="140"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                        strokeDasharray="4 8"
                        fill="none"
                      />
                      <circle
                        cx="160"
                        cy="160"
                        r="102"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                        fill="none"
                      />

                      {/* 4 Quadrant Arrows in 4 Official IET Colors */}
                      {/* 1. Green Arrow - Connect / Sustainability (#AAC81E) */}
                      <g transform="rotate(0 160 160)" filter="url(#glowGreen)">
                        <path
                          d="M 277.8 182.9 A 120 120 0 0 1 182.9 277.8"
                          stroke="#AAC81E"
                          strokeWidth="6.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <polygon
                          points="169.2,280.5 186.7,286.7 183.1,268.1"
                          fill="#AAC81E"
                        />
                      </g>

                      {/* 2. Cyan Arrow - Learn / Technology (#22BBE0) */}
                      <g transform="rotate(90 160 160)" filter="url(#glowCyan)">
                        <path
                          d="M 277.8 182.9 A 120 120 0 0 1 182.9 277.8"
                          stroke="#22BBE0"
                          strokeWidth="6.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <polygon
                          points="169.2,280.5 186.7,286.7 183.1,268.1"
                          fill="#22BBE0"
                        />
                      </g>

                      {/* 3. Purple Arrow - Innovate / Local Network (#A046B4) */}
                      <g transform="rotate(180 160 160)" filter="url(#glowPurple)">
                        <path
                          d="M 277.8 182.9 A 120 120 0 0 1 182.9 277.8"
                          stroke="#A046B4"
                          strokeWidth="6.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <polygon
                          points="169.2,280.5 186.7,286.7 183.1,268.1"
                          fill="#A046B4"
                        />
                      </g>

                      {/* 4. Orange Arrow - Celebrate / Impact (#EE7520) */}
                      <g transform="rotate(270 160 160)" filter="url(#glowOrange)">
                        <path
                          d="M 277.8 182.9 A 120 120 0 0 1 182.9 277.8"
                          stroke="#EE7520"
                          strokeWidth="6.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <polygon
                          points="169.2,280.5 186.7,286.7 183.1,268.1"
                          fill="#EE7520"
                        />
                      </g>

                      {/* 4 Colored Orbit Accent Dots */}
                      <circle cx="280" cy="160" r="3" fill="#AAC81E" />
                      <circle cx="160" cy="280" r="3" fill="#22BBE0" />
                      <circle cx="40" cy="160" r="3" fill="#A046B4" />
                      <circle cx="160" cy="40" r="3" fill="#EE7520" />
                    </svg>
                  </div>

                  {/* 360° Text inside the rotating circular frame */}
                  <span className="relative z-10 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-purple-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                    360°
                  </span>
                </div>
              </div>

              {/* Slogan */}
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-white drop-shadow-md mt-4 group-hover/emblem:text-purple-100 transition-colors">
                One Platform. Infinite Possibilities.
              </p>

              {/* Action Pillars - Colored according to the 4 IET Colors */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">
                <span className="text-[#AAC81E] hover:drop-shadow-[0_0_8px_#AAC81E] transition-all">Connect</span>
                <span className="text-white/40">&bull;</span>
                <span className="text-[#22BBE0] hover:drop-shadow-[0_0_8px_#22BBE0] transition-all">Learn</span>
                <span className="text-white/40">&bull;</span>
                <span className="text-[#A046B4] hover:drop-shadow-[0_0_8px_#A046B4] transition-all">Innovate</span>
                <span className="text-white/40">&bull;</span>
                <span className="text-[#EE7520] hover:drop-shadow-[0_0_8px_#EE7520] transition-all">Celebrate</span>
              </div>
            </div>

            {/* Two-Day Event Theme Pills - Single Unified Professional Style */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-4 max-w-3xl mx-auto">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#A046B4]/10 border border-[#A046B4]/25 text-xs text-white/90 font-medium backdrop-blur-sm hover:border-[#A046B4]/50 transition-colors">
                <Lightbulb className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Innovation</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#A046B4]/10 border border-[#A046B4]/25 text-xs text-white/90 font-medium backdrop-blur-sm hover:border-[#A046B4]/50 transition-colors">
                <Leaf className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Sustainability</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#A046B4]/10 border border-[#A046B4]/25 text-xs text-white/90 font-medium backdrop-blur-sm hover:border-[#A046B4]/50 transition-colors">
                <Users className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Industry Interaction</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#A046B4]/10 border border-[#A046B4]/25 text-xs text-white/90 font-medium backdrop-blur-sm hover:border-[#A046B4]/50 transition-colors">
                <Cpu className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Engineering Excellence</span>
              </div>
            </div>

            {/* Date & Location Pill */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-2.5 text-xs sm:text-sm text-white/90 mb-3 shadow-lg">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Calendar className="w-4 h-4 text-[#C084FC]" /> 4 &amp; 5 December 2026
              </span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="flex items-center gap-1.5 text-white/90 font-medium">
                <MapPin className="w-4 h-4 text-[#C084FC]" /> VIT-AP University, Amaravati, Andhra Pradesh
              </span>
            </div>

            {/* Motto */}
            <p className="text-xs sm:text-sm italic text-white/60 tracking-wider">
              &ldquo;Engineering today for a sustainable tomorrow&rdquo;
            </p>
          </div>

          {/* Action Buttons - Single Professional Color Palette */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Link
              to="/innothon"
              className="group relative px-7 py-3 bg-[#A046B4] hover:bg-[#8E38A1] text-white font-extrabold text-sm rounded-xl shadow-[0_0_25px_rgba(160,70,180,0.4)] hover:shadow-[0_0_35px_rgba(160,70,180,0.65)] hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-white text-white group-hover:rotate-45 transition-transform duration-500" />
                Register for Events
              </span>
            </Link>

            <Link
              to="/agenda"
              className="group px-7 py-3 bg-black/40 backdrop-blur-xl border border-white/15 text-white rounded-xl font-bold text-sm hover:border-[#A046B4]/60 hover:bg-[#A046B4]/10 hover:shadow-[0_0_25px_rgba(160,70,180,0.25)] transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C084FC] group-hover:scale-110 transition-transform duration-300" />
                Event Schedule
              </span>
            </Link>

            <Link
              to="/awards"
              className="group px-7 py-3 bg-black/40 backdrop-blur-xl border border-[#A046B4]/30 text-white rounded-xl font-bold text-sm hover:border-[#A046B4] hover:bg-[#A046B4]/10 hover:shadow-[0_0_25px_rgba(160,70,180,0.3)] transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C084FC] group-hover:scale-110 transition-transform duration-300" />
                IET 360° Awards
              </span>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-4 hidden md:flex">
            <ChevronDown className="w-5 h-5 text-white/50 animate-bounce" />
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.7; }
          }
          
          .stars-small, .stars-medium, .stars-large {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(2px 2px at var(--star-x, 50%) var(--star-y, 50%), rgba(255, 255, 255, 0.3), transparent);
            background-size: 200px 200px;
            animation: twinkle 4s infinite;
          }
          
          .stars-medium {
            background-image: radial-gradient(3px 3px at var(--star-x, 30%) var(--star-y, 70%), rgba(255, 255, 255, 0.3), transparent);
            background-size: 300px 300px;
            animation-delay: 2s;
          }
          
          .stars-large {
            background-image: radial-gradient(4px 4px at var(--star-x, 70%) var(--star-y, 30%), rgba(255, 255, 255, 0.3), transparent);
            background-size: 400px 400px;
            animation-delay: 3s;
          }

          /* Continuously rotating 360 circle - mathematically flawless circle rotation */
          .rotating-circle-flawless {
            animation: ietSpin 18s linear infinite;
            transform-origin: center center;
            will-change: transform;
          }

          @keyframes ietSpin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
