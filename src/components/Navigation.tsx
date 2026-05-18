import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Facebook, Instagram, Linkedin, Menu, X, Bell, Calendar, Trophy, Mic } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const [isInnoverseOpen, setIsInnoverseOpen] = useState(false);

  const location = useLocation();
  const getThemeClasses = (path: string) => {
    const p = path.toLowerCase();
    if (p.includes('innothon')) {
      return {
        gradient: 'from-[#AAC81E] to-[#10322B]',
        textHover: 'hover:text-[#AAC81E]',
        text: 'text-[#AAC81E]',
        border: 'border-[#AAC81E]/30',
        shadow: 'shadow-[0_4px_25px_rgba(170,200,30,0.15)]',
        mobileMenuShadow: 'shadow-[-8px_0_30px_rgba(170,200,30,0.1)]',
        textActive: 'text-[#AAC81E]',
        logoSrc: '/iet_new_logo_green.png'
      };
    } else if (p.includes('startupsphere')) {
      return {
        gradient: 'from-[#EE7520] to-[#671F20]',
        textHover: 'hover:text-[#EE7520]',
        text: 'text-[#EE7520]',
        border: 'border-[#EE7520]/30',
        shadow: 'shadow-[0_4px_25px_rgba(238,117,32,0.15)]',
        mobileMenuShadow: 'shadow-[-8px_0_30px_rgba(238,117,32,0.1)]',
        textActive: 'text-[#EE7520]',
        logoSrc: '/iet_new_logo_orange.png'
      };
    } else if (p.includes('appastral') || p.includes('patn')) {
      return {
        gradient: 'from-[#22BBE0] to-[#003A66]',
        textHover: 'hover:text-[#22BBE0]',
        text: 'text-[#22BBE0]',
        border: 'border-[#22BBE0]/30',
        shadow: 'shadow-[0_4px_25px_rgba(34,187,224,0.15)]',
        mobileMenuShadow: 'shadow-[-8px_0_30px_rgba(34,187,224,0.1)]',
        textActive: 'text-[#22BBE0]',
        logoSrc: '/iet_new_logo_bluew.png'
      };
    }
    // Default (ProtoPlanet, Home)
    return {
      gradient: 'from-[#A046B4] to-[#53274E]',
      textHover: 'hover:text-[#A046B4]',
      text: 'text-[#A046B4]',
      border: 'border-[#A046B4]/30',
      shadow: 'shadow-[0_4px_25px_rgba(255,255,255,0.15)]',
      mobileMenuShadow: 'shadow-[-8px_0_30px_rgba(160,70,180,0.1)]',
      textActive: 'text-[#A046B4]',
      logoSrc: '/iet_new_logo_purple.png'
    };
  };
  const theme = getThemeClasses(location.pathname);

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsEventsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsEventsDropdownOpen(false);
      setIsInnoverseOpen(false);
    }, 300);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Agenda', href: '#agenda' },
    {
      name: 'Events',
      href: '#events',
      hasDropdown: true,
      dropdownItems: [
        { name: 'PATN', href: '/patn' },
        {
          name: 'Innoverse',
          href: '#events',
          subItems: [
            { name: 'InnoThon', href: '/innothon' },
            { name: 'ProtoPlanet', href: '/protoplanet' },
            { name: 'StartupSphere', href: '/startupsphere' },
            { name: 'AppAstral', href: '/appastral' }
          ]
        }
      ]
    },
    { name: 'Registration', href: '#register' },
    { name: 'Awards', href: '#awards' },
    { name: 'Committee', href: '#committee' },
    { name: 'Contact', href: '#contact' }
  ];

  const announcements = [
    { id: 1, text: "Registration is now open!" },
    { id: 2, text: "Agenda will be released soon" },
    { id: 3, text: "Awards nominations are live" },
    { id: 4, text: "Keynote speakers to be announced" },
  ];
  const marqueeItems = [...announcements, ...announcements, ...announcements];

  return (
    <>
      {/* Social Bar & Announcements */}
      <div className="w-full bg-[#050505] border-b border-white/5 py-2 px-4 z-40 relative">
        <div className="container mx-auto w-[95%] lg:w-[80%] flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-sm">
          
          {/* Announcements Ticker */}
          <div className="w-full sm:w-auto flex-1 overflow-hidden relative flex items-center bg-white/5 rounded-full px-3 py-1 border border-white/5">
            <div className="flex items-center gap-2 mr-2 sm:mr-4 shrink-0 z-10 pl-1 pr-2 rounded-full">
              <div className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 bg-white`}></span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider">NEWS:</span>
            </div>
            
            <div className="flex-1 overflow-hidden relative mask-fade-edges">
              <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
                {marqueeItems.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex items-center mx-4 space-x-2 cursor-pointer group">
                    <span className="text-[10px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                      {item.text}
                    </span>
                    <span className="ml-4 text-white/20">|</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 shrink-0 mt-1 sm:mt-0">
            <span className="text-white/90 font-semibold tracking-wide text-[10px] sm:text-xs">Stay Updated With Us</span>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className={`text-white/80 ${theme.textHover} transition-colors`}>
                <Facebook size={14} className="sm:w-4 sm:h-4" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className={`text-white/80 ${theme.textHover} transition-colors`}>
                <Instagram size={14} className="sm:w-4 sm:h-4" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className={`text-white/80 ${theme.textHover} transition-colors`}>
                <Linkedin size={14} className="sm:w-4 sm:h-4" />
              </a>
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
          .mask-fade-edges {
            mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          }
        `}</style>
      </div>

      {/* Main Header */}
      <div className="sticky top-0 z-50 w-full bg-black">
        <header className={`transition-all duration-300 w-[95%] xl:w-[90%] mx-auto pb-2 ${isScrolled ? 'pt-0' : 'pt-2'}`}>
          <div className={`${theme.shadow} rounded-b-lg`}>
          {/* Gradient Top Border */}
          <div className={`h-[6px] w-full bg-gradient-to-r ${theme.gradient} rounded-t-lg`}></div>

          <nav className="bg-[#050505] text-white rounded-b-lg px-4 lg:px-6 relative">
            <div className="flex items-center justify-between h-[65px] gap-8">
              {/* Logos */}
              <Link to="/" className="flex items-center gap-3 shrink-0 pr-4">
                <img
                  src={theme.logoSrc}
                  alt="IET Logo"
                  className="h-10 w-auto object-contain drop-shadow-md"
                />
                <div className="h-8 w-px bg-white/20 hidden sm:block"></div>
                <img
                  src="/nit2.jpg"
                  alt="NIT Warangal Logo"
                  className="h-10 w-auto object-contain bg-white rounded-md shadow-sm"
                />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-3 xl:gap-6">
                {navItems.map((item) => (
                  <div key={item.name} className="relative">
                    {item.hasDropdown ? (
                      <div
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button className={`flex items-center gap-1 text-base font-semibold ${theme.textHover} transition-colors duration-200 uppercase tracking-wide text-sm`}>
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transform transition-transform duration-300 ${isEventsDropdownOpen ? 'rotate-180' : ''
                              }`}
                          />
                        </button>

                        {/* Main Dropdown */}
                        <div
                          className={`absolute top-full left-0 mt-4 w-40 border border-white/10 rounded-lg shadow-xl py-2 bg-[#0a0a0a] transform transition-all duration-300 ease-in-out ${isEventsDropdownOpen
                            ? 'opacity-100 translate-y-0 visible'
                            : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                            }`}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.dropdownItems?.map((dropdownItem) => (
                            <div key={dropdownItem.name}>
                              {dropdownItem.subItems ? (
                                <div
                                  className="group relative"
                                  onMouseEnter={() => setIsInnoverseOpen(true)}
                                  onMouseLeave={() => setIsInnoverseOpen(false)}
                                >
                                  <a
                                    href={dropdownItem.href}
                                    className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium hover:bg-white/5 ${theme.textHover} transition-all duration-200`}
                                  >
                                    <span>{dropdownItem.name}</span>
                                    <ChevronDown
                                      className={`w-4 h-4 transform transition-transform duration-300 ${isInnoverseOpen ? `rotate-90 ${theme.text}` : '-rotate-90'
                                        }`}
                                    />
                                  </a>

                                  {/* Innoverse Submenu */}
                                  <div
                                    className={`absolute left-full top-0 w-44 ml-1 border border-white/10 rounded-lg shadow-xl py-2 bg-[#0a0a0a] transform transition-all duration-300 ease-in-out ${isInnoverseOpen
                                      ? 'opacity-100 translate-x-0 visible'
                                      : 'opacity-0 -translate-x-2 invisible pointer-events-none'
                                      }`}
                                  >
                                    {dropdownItem.subItems.map((subItem) => (
                                      <a
                                        key={subItem.name}
                                        href={subItem.href}
                                        className={`block px-4 py-2 text-sm font-medium hover:bg-white/5 ${theme.textHover} transition-all duration-200`}
                                      >
                                        {subItem.name}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <a
                                  href={dropdownItem.href}
                                  className={`block px-4 py-2.5 text-sm font-medium hover:bg-white/5 ${theme.textHover} transition-all duration-200`}
                                >
                                  {dropdownItem.name}
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : item.name === 'Home' ? (
                      <Link
                        to={item.href}
                        className={`font-semibold ${theme.textHover} transition-colors duration-200 uppercase tracking-wide text-sm`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className={`font-semibold ${theme.textHover} transition-colors duration-200 uppercase tracking-wide text-sm`}
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={28} />
              </button>
            </div>
          </nav>
          </div>

          {/* Mobile Navigation Menu */}
          {/* Overlay */}
          <div 
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
              isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div 
            className={`fixed top-0 right-0 h-full w-[85vw] sm:w-[350px] bg-[#050505] z-50 transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${theme.mobileMenuShadow} ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className={`h-[6px] w-full bg-gradient-to-r ${theme.gradient}`}></div>
            
            <div className="flex flex-col h-full overflow-hidden">
              {/* Menu Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <span className="text-sm font-bold uppercase tracking-wider text-white/90">Navigation</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 -mr-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-3 px-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsEventsDropdownOpen(!isEventsDropdownOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white/90 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${theme.text} ${isEventsDropdownOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${isEventsDropdownOpen ? 'max-h-96' : 'max-h-0'}`}>
                          <div className={`ml-3 pl-3 border-l ${theme.border} space-y-1 py-1`}>
                            {item.dropdownItems?.map((dropdownItem) => (
                              <div key={dropdownItem.name}>
                                {dropdownItem.subItems ? (
                                  <>
                                    <span className="block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                                      {dropdownItem.name}
                                    </span>
                                    {dropdownItem.subItems.map((subItem) => (
                                      <a
                                        key={subItem.name}
                                        href={subItem.href}
                                        className={`block px-3 py-2 text-sm text-white/80 ${theme.textHover} hover:bg-white/5 rounded-md transition-all`}
                                        onClick={() => setIsMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </a>
                                    ))}
                                  </>
                                ) : (
                                  <a
                                    href={dropdownItem.href}
                                    className={`block px-3 py-2 text-sm text-white/80 ${theme.textHover} hover:bg-white/5 rounded-md transition-all`}
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {dropdownItem.name}
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : item.name === 'Home' ? (
                      <Link
                        to={item.href}
                        className={`block px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white/90 hover:bg-white/5 ${theme.textHover} rounded-lg transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className={`block px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white/90 hover:bg-white/5 ${theme.textHover} rounded-lg transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Footer */}
              <div className="px-5 py-4 border-t border-white/10">
                <p className="text-[11px] text-white/40 text-center">© 2025 Future Technology Conclave</p>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navigation;
