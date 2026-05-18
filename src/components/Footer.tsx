import React from 'react';
import { Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] relative overflow-hidden border-t border-white/10">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="py-16 relative z-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Column 1: Logos and Description */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/iet_new_logo_purple.png"
                  alt="IET Logo" 
                  className="h-12 w-auto object-contain drop-shadow-lg"
                />
                <div className="h-10 w-px bg-white/20"></div>
                <img 
                  src="/nit2.jpg"
                  alt="NIT Warangal Logo" 
                  className="h-12 w-auto object-contain bg-white rounded-md p-1 shadow-lg"
                />
              </div>
              <p className="text-white/70 text-base leading-relaxed mb-6 max-w-sm">
                Empowering the next generation of technologists and innovators at the Future Technology Conclave 2025.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 group">
                  <Linkedin className="w-5 h-5 text-white/70 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a href="#" className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 group">
                  <Instagram className="w-5 h-5 text-white/70 group-hover:text-purple-400 transition-colors" />
                </a>
              </div>
            </div>
            
            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 md:col-start-7">
              <h3 className="font-semibold text-white mb-6 text-lg tracking-wide">Quick Links</h3>
              <div className="space-y-3">
                {['Home', 'Agenda', 'Events', 'Registration', 'Committee'].map((link) => (
                  <a key={link} href={link === 'Home' ? '/' : `#${link.toLowerCase()}`} className="group flex items-center text-white/70 hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-cyan-400" />
                    <span>{link}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Column 3: Contact */}
            <div className="md:col-span-3">
              <h3 className="font-semibold text-white mb-6 text-lg tracking-wide">Contact Us</h3>
              <div className="space-y-4">
                <a href="mailto:ietln.hyderabad@gmail.com" className="flex items-start space-x-3 text-white/70 hover:text-white transition-colors group">
                  <div className="mt-1 p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-white/30 transition-colors">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-sm leading-relaxed">ietln.hyderabad@gmail.com</span>
                </a>
              </div>
            </div>
            
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="flex flex-col text-center md:text-left">
              <p className="text-white/60 text-sm">
                © 2025 Future Technology Conclave | Hyderabad Local Network | In association with NIT Warangal
              </p>
              <p className="text-white/40 text-[10px] mt-2">
                © The Institution of Engineering and Technology
                <br />
                The Institution of Engineering and Technology is registered as a Charity in England & Wales (No. 211074) and Scotland (No. SC000086)
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
