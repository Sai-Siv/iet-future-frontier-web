import React, { useEffect } from 'react';
import { Target, Users, Trophy } from 'lucide-react';
import ScrollReveal from 'scrollreveal';

const PATNAboutSection = () => {
  useEffect(() => {
    ScrollReveal().reveal('.reveal-fade', {
      duration: 1000,
      distance: '40px',
      easing: 'ease-in-out',
      origin: 'bottom',
      reset: false,
      interval: 150,
    });
  }, []);

  const features = [
    {
      icon: <Target className="w-6 h-6 text-[#22BBE0]" />,
      title: "Competition Overview",
      description: "Present Around the Network (PATN) is a global competition that challenges participants to demonstrate their presentation skills and technical knowledge."
    },
    {
      icon: <Users className="w-6 h-6 text-[#22BBE0]" />,
      title: "Who Can Participate",
      description: "Open to students and young professionals under 35 years old. Showcase your research, projects, or innovative ideas in technology."
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#22BBE0]" />,
      title: "Benefits",
      description: "Gain recognition, enhance your presentation skills, network with industry experts, and win exciting prizes. Top performers advance to regional and global rounds."
    }
  ];

  return (
    <section className="py-16 bg-black" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal-fade">
          <h2 className="text-white font-bold mb-4" style={{ 
            fontSize: '2.5rem', 
            textShadow: '0 1px 10px rgba(34, 187, 224, 0.2)',
            fontFamily: "'Times New Roman', Times, serif"
          }}>
            About PATN Competition
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="reveal-fade relative p-6 rounded-lg bg-black/40 backdrop-blur-xl border border-[#22BBE0]/20 hover:border-[#22BBE0]/40 transition-all duration-500 
              shadow-[0_4px_20px_-2px_rgba(34,187,224,0.25),0_0_8px_0_rgba(34,187,224,0.1)] 
              hover:shadow-[0_8px_30px_-2px_rgba(34,187,224,0.35),0_0_12px_0_rgba(34,187,224,0.2)] 
              group before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-[#22BBE0]/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity overflow-hidden"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              <div className="relative flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-[#22BBE0]/10 mb-4 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(34,187,224,0.2)]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 [text-shadow:_0_1px_5px_rgb(34_187_224_/_15%)]">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PATNAboutSection;