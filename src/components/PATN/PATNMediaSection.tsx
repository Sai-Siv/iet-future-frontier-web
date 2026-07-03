import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { MessageCircle, Youtube } from 'lucide-react';

const PATNMediaSection = () => {
  useEffect(() => {
    ScrollReveal().reveal('.media-header', {
      origin: 'top',
      distance: '50px',
      duration: 800,
      easing: 'ease-out',
    });

    ScrollReveal().reveal('.media-card', {
      origin: 'bottom',
      distance: '50px',
      duration: 800,
      easing: 'ease-out',
      delay: 200,
    });
  }, []);

  return (
    <section className="media-container py-16 px-4 relative" style={{ fontFamily: "'Times New Roman', Times, serif", background: '#000' }}>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#25D366]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="media-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide drop-shadow-md">
            Watch & Connect
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Learn more about PATN and join our vibrant community for the latest updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* YouTube Video Wrapper */}
          <div className="media-card bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(255,0,0,0.1)] hover:shadow-[0_0_60px_rgba(255,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group h-full flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF0000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 flex items-center justify-center shrink-0">
                <Youtube className="text-[#FF0000] w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide">Sample Video</h3>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden aspect-video border border-white/5 flex-grow">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/UEQGA4xXccU?si=2zK7ZXZvLg8YnZ-_"
                title="PATN 2026 YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* WhatsApp Group Wrapper */}
          <div className="media-card bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(37,211,102,0.1)] hover:shadow-[0_0_60px_rgba(37,211,102,0.2)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#25D366]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="text-[#25D366] w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-wide">Join Our WhatsApp Group</h3>
              </div>

              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Stay in the loop! Join the official PATN WhatsApp group to get real-time updates, ask questions directly to coordinators, and network with other participants.
              </p>
            </div>

            <a
              href="https://chat.whatsapp.com/HShc3wesgck3yJQ776l7wn"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 w-[200%] h-full bg-white/20 translate-x-[-150%] skew-x-12 group-hover/btn:translate-x-[50%] transition-transform duration-700 ease-out"></div>
              <MessageCircle className="w-6 h-6" />
              <span className="text-xl tracking-wide">Join WhatsApp Group</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PATNMediaSection;
